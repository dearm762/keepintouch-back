import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('authorization')
  authorize(
    @Body('authType') authType: 'credentials' | 'google',
    @Body('accessToken') accessToken: string | null,
    @Body('email') email: string | null
  ) {
    if (!authType) throw new BadRequestException('authType is required')
    if (authType !== 'credentials' && authType !== 'google') {
      throw new BadRequestException('authType must be "credentials" or "google"')
    }
    if (authType === 'google' && !accessToken) {
      throw new BadRequestException('accessToken is required, if authType is "google"')
    }
    if (authType === 'credentials' && !email) {
      throw new BadRequestException('email is required, if authType is "credentials"')
    }

    return 'success'

    // return this.authService.authorize()
  }

}
