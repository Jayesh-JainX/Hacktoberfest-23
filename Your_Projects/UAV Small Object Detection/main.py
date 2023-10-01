from typing import Union
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import StreamingResponse

import albumentations as A
from torchvision import transforms as T

import os
from random import randint
import uuid
import pickle
import torch
import torchvision

from PIL import Image, ImageDraw
from io import BytesIO
import numpy as np

IMAGEDIR = "images/"
app = FastAPI()


class CPU_Unpickler(pickle.Unpickler):
    def find_class(self, module, name):
        if module == 'torch.storage' and name == '_load_from_bytes':
            return lambda b: torch.load(BytesIO(b), map_location='cpu')
        else:
            return super().find_class(module, name)


def load_image_into_numpy_array(data):
    return np.array(data)


def predict(img):
    model = CPU_Unpickler(open('model.pkl', 'rb')).load()
    # model = pickle.load(open('model.pkl', 'rb'))
    device = torch.device(
        'cuda') if torch.cuda.is_available() else torch.device('cpu')
    # device = torch.device('cpu')
    transform = A.Compose([A.Resize(1000, 1000, p=1.0)])
    transformed = transform(image=img)
    img = transformed["image"]
    img = T.ToTensor()(img)
    output = model([img.to(device)])
    boxes = output[0]['boxes']
    labels = output[0]['labels']
    scores = output[0]['scores']

    # Apply Non-Maximum Suppression
    keep = torchvision.ops.nms(boxes, scores, iou_threshold=0.5)
    filtered_boxes = boxes[keep]
    filtered_labels = labels[keep]
    filtered_scores = scores[keep]

    return filtered_boxes, filtered_labels, filtered_scores


@app.post("/")
async def read_root(file: UploadFile = File(...)):
    image = Image.open(BytesIO(await file.read())).convert('RGB')
    np_image = load_image_into_numpy_array(image)
    boxes, labels, scores = predict(np_image)
    keep = torchvision.ops.nms(boxes, scores, 0.45)
    image = image.resize((1000, 1000))
    draw = ImageDraw.Draw(image)

    CLASSES = {
        0: '__background__',
        1: 'building',
        2: 'ship',
        3: 'vehicle',
        4: 'prefabricated-house',
        5: 'well',
        6: 'cable-tower',
        7: 'pool',
        8: 'landslide',
        9: 'cultivation-mesh-cage',
        10: 'quarry'
    }

    for box, label, score in zip(boxes, labels, scores):
        # print(box.xmin)
        draw.rectangle(
            [(box[0], box[1]), (box[2], box[3])],
            outline="red",
            width=2
        )
        label_text = f"Label: {CLASSES[int(label)]}, Score: {score:.2f}"
        draw.text((box[0], box[1]), label_text, fill="black")

    output_stream = BytesIO()
    image.save(output_stream, format="JPEG")
    output_stream.seek(0)

    return StreamingResponse(output_stream, media_type="image/jpeg")
