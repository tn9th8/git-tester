import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy as JsonWebToken } from 'passport-jwt';
import { Jwt } from 'src/common/enums/jwt.enum';
import { AuthUserDto } from '../dto/auth-user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(JsonWebToken) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>(Jwt.ACCESS_TOKEN_SECRET),
        });
    }

    async validate(payload: any): Promise<AuthUserDto | null> {
        const user: AuthUserDto = payload.user;
        if (!user) {
            throw new ForbiddenException("Token không hợp lệ. Vui lòng logim");
        }
        return user;
    }
}