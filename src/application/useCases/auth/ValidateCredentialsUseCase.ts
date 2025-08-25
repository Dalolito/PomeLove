import bcrypt from 'bcryptjs';

export interface ValidateCredentialsRequest {
  username: string;
  password: string;
}

export interface ValidateCredentialsResult {
  success: boolean;
  user?: {
    id: string;
    username: string;
    role: string;
  };
  error?: string;
}

export class ValidateCredentialsUseCase {
  async execute(request: ValidateCredentialsRequest): Promise<ValidateCredentialsResult> {
    try {
      const adminUsername = process.env.ADMIN_USERNAME;
      const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

      if (!adminUsername || !adminPasswordHash) {
        return {
          success: false,
          error: 'Server configuration error',
        };
      }

      if (request.username !== adminUsername) {
        return {
          success: false,
          error: 'Invalid credentials',
        };
      }

      const isPasswordValid = await bcrypt.compare(request.password, adminPasswordHash);
      
      if (!isPasswordValid) {
        return {
          success: false,
          error: 'Invalid credentials',
        };
      }

      return {
        success: true,
        user: {
          id: 'admin',
          username: adminUsername,
          role: 'admin',
        },
      };
    } catch (error) {
      console.error('Error validating credentials:', error);
      return {
        success: false,
        error: 'Authentication failed',
      };
    }
  }
}
