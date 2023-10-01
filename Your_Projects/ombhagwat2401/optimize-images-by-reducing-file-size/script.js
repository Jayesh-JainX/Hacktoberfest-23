function optimizeImage() {

    document.getElementById('loader').style.display = 'block';
    const input = document.getElementById('imageInput');
    const originalImage = document.getElementById('originalImage');
    const optimizedImage = document.getElementById('optimizedImage');
    const originalSize = document.getElementById('originalSize');
    const optimizedSize = document.getElementById('optimizedSize');
    const downloadButton = document.getElementById('downloadButton');


    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {

        originalImage.src = e.target.result;

        const img = new Image();
        img.src = e.target.result;

        img.onload = function () {
            document.getElementById('loader').style.display = 'none';
            document.getElementById('outputContainer').style.display = "block";

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);

            const originalBlob = dataURItoBlob(e.target.result);
            originalSize.textContent = `Original Size: ${formatBytes(originalBlob.size)}`;

            canvas.toBlob(function (blob) {
                const optimizedUrl = URL.createObjectURL(blob);
                optimizedImage.src = optimizedUrl;

                optimizedSize.textContent = `Optimized Size: ${formatBytes(blob.size)}`;


                downloadButton.href = optimizedUrl;
            }, 'image/jpeg', 0.8); // Adjust quality as needed (0-1)
        }
    }

    reader.readAsDataURL(file);
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function dataURItoBlob(dataURI) {
    const splitDataURI = dataURI.split(',');
    const byteString = atob(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeString });
}