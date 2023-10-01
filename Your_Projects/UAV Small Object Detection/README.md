# UAV Small Object Detection

## Project Overview

This repository contains the code for a machine learning model and a FastAPI-based inference API. The project is designed to demonstrate the process of training a machine learning model and deploying it as a RESTful API for inference using FastAPI.

## Files

1. `training.ipynb`: This Jupyter Notebook contains the code used for training the machine learning model. It includes data preprocessing, model training, evaluation, and model serialization. You can open and run this notebook in a Jupyter environment to reproduce the model training process.

2. `main.py`: This Python file implements a RESTful API using FastAPI for model inference. The API loads the trained model and serves predictions based on incoming requests. It's designed to be deployed as a web service to provide real-time predictions.

## Getting Started

To get started with this project, follow these steps:

1. Run the train.ipynb file to train and export the model.
2. Then run the main.py using following code snippet

$ uvicorn inference_api:app --host 0.0.0.0 --port 8000

## Sample Output

![Sample Screenshot](./images/sample-output.gif)
