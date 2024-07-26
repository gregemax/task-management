import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/update-auth.input';

@Controller('auth')
export class AuthController {
    constructor(private authsrevice: AuthService) { }
    @Post('login')
    login(@Body(){password,email}) {
        try {
            return this.authsrevice.login(password,email)
        } catch (error) {
            throw new Error(error.message)
        }
    }
    @Get('logout')
    logout(@Body(){password,email}:LoginInput) {
        try {
            return this.authsrevice.logout()
        } catch (error) {
            throw new Error(error.message)
        }
    }
}
