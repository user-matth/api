import { Test, TestingModule } from '@nestjs/testing';
import { MailerServices } from './mailer.service';

describe('MailerServices', () => {
  let service: MailerServices;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailerServices],
    }).compile();

    service = module.get<MailerServices>(MailerServices);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
