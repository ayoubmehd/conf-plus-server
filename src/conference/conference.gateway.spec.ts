import { Test, TestingModule } from '@nestjs/testing';
import { ConferenceGateway } from './conference.gateway';

describe('ConferenceGateway', () => {
  let gateway: ConferenceGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConferenceGateway],
    }).compile();

    gateway = module.get<ConferenceGateway>(ConferenceGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
