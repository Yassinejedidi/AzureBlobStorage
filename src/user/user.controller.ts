import { Body, Controller, Inject, Post, Get, ValidationPipe, UseInterceptors, UploadedFile, Res, Query, Delete, Param } from '@nestjs/common';
import { userService } from './user.service';
import { AuthCredentialsDto } from 'src/common/dtos/auth-credentials.dto';
import { SingCredentialsDto } from 'src/common/dtos/signin-credentials.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AzureBlobService } from 'src/Azure_Services/azure-blob.service';
import { Public } from 'src/common/decorators/public.decorator';




@Controller('user')
export class userController {
    containerName = "nestapplicationtest";
    constructor( 
        @Inject(userService)
        private authService: userService,
        private readonly azureBlobService: AzureBlobService,
    ){}

    // Method for user sign-up
    @Public()
    @Post('/signup')
    async signUp(@Body(ValidationPipe) authCredantialsDto:AuthCredentialsDto){
        return await this.authService.signUp(authCredantialsDto)
    }

    // Method for user sign-in
    @Public()    
    @Post('/signin')
    async signIn(@Body(ValidationPipe) authCredantialsDto:SingCredentialsDto): Promise<{accesToken:string}>{
        return await this.authService.signIn(authCredantialsDto)
    }

    // Method to upload file to Azure Blob Storage
    @Post('upload')
    @UseInterceptors(FileInterceptor('myfile'))
    async upload(@UploadedFile() file: Express.Multer.File): Promise<string> {
      const fileUploaded= this.azureBlobService.upload(file,this.containerName);
      return fileUploaded;
    }

    // Method to retrieve file from Azure Blob Storage
    @Get('read')
    async readFile(@Res() res,@Query('filename') filename){
      const file = await this.azureBlobService.getfile(filename,this.containerName);
      return file.pipe(res);
    }

    // Method to delete file from Azure Blob Storage
    @Delete('delete')
    async DeleteFile(@Query('filename') filename){
        await this.azureBlobService.deletefile(filename,this.containerName);
        return { message: 'File deleted successfully' };
    }
}
