import { InterestModule } from './interest.module';

describe('InterestModule', () => {
  let interestModule: InterestModule;

  beforeEach(() => {
    interestModule = new InterestModule();
  });

  it('should create an instance', () => {
    expect(interestModule).toBeTruthy();
  });
});
