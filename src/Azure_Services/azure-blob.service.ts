import { uuid } from 'uuidv4';
import { Injectable } from '@nestjs/common';
import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import * as config from 'config';


@Injectable()
export class AzureBlobService {
  containerName: string;
  azureConnection = config.get('azure.AZURE_STORAGE_CONNEXION_STRING');

  // Get blob client
  getBlobClient(imageName: string): BlockBlobClient {
    const blobClientService = BlobServiceClient.fromConnectionString(this.azureConnection);
    const containerClient = blobClientService.getContainerClient(this.containerName);
    const blobClient = containerClient.getBlockBlobClient(imageName);
    return blobClient;
  }

  // Upload file
  async upload(file: Express.Multer.File, containerName: string): Promise<string> {
    try {
      this.containerName = containerName;
      const pdfUrl = uuid() + file.originalname;
      const blobClient = this.getBlobClient(pdfUrl);
      await blobClient.uploadData(file.buffer);      
      return `File uploaded successfully. File URL: ${pdfUrl}`;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Failed to upload file');
    }
  }
  

  // Read file from azureblob
  async getfile(fileName: string, containerName: string) {
    this.containerName = containerName;
    const blobClient = this.getBlobClient(fileName);
    const blobDownloaded = await blobClient.download();
    return blobDownloaded.readableStreamBody;
  }

  // Delete file
  async deletefile(filename: string, containerName: string) {
    this.containerName = containerName;
    const blobClient = this.getBlobClient(filename);
    await blobClient.deleteIfExists();
  }
}
