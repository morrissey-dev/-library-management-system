import { Body,Controller,Get,Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import{RegisterDto} from './dto/register.dto.js'
import{LoginDto} from './dto/login.dto.js'
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
import { Roles } from './decorators/roles.decorator.js';
import{RolesGuard} from './guards/roles.guard.js'


@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('register')
    register(@Body() registerDto:RegisterDto){
        return this.authService.register(registerDto);
    }

    @Post('login')
    login(@Body() loginDto:LoginDto){
        return this.authService.login(loginDto.email,loginDto.password);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(){
        return {
            message:'You have accessed a protected route',
        }
    }

    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles('LIBRARIAN')
    @Get('librarian')
    getLibrarianData(){
        return {
            message:'Welcome to the Librarian Dashboard!',
        }
    }
}
