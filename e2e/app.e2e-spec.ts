import { EventCentralPage } from './app.po';

describe('event-central App', () => {
  let page: EventCentralPage;

  beforeEach(() => {
    page = new EventCentralPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
