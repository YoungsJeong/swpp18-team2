import {TestBed, inject, async} from '@angular/core/testing';

import {Interest, InterestService, InterestTag} from './interest.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FeedService, TagColor} from './feed.service';
import {HTTP_INTERCEPTORS, HttpClient, HttpInterceptor} from '@angular/common/http';
import {ApiUrlInterceptor} from './api-url-interceptor';
import {TOKEN_KEY} from './auth.service';
import {environment} from '../../environments/environment';

const mockColor: TagColor = {
  id: 1, name: 'color', rgb: '#ffffff'
}
const mockInterestTags: InterestTag[] = [
  { id: 1, name: 'tag1',  color: mockColor}
]
const mockInterest: Interest[] = [
  {id: 1, name: 'interest1', createUser: 'user1', createdDate: 'now', photoURL: 'test', tags: mockInterestTags}
]

describe('InterestService', () => {
  let httpClient;
  let store;
  let mockLocalStorage;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [InterestService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ApiUrlInterceptor,
          multi: true
        }]
    });
    httpClient = TestBed.get(HttpTestingController)
    store = {}
    mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    }
  });

  it('should be created', inject([InterestService], (service: InterestService) => {
    expect(service).toBeTruthy();
  }));
  it('should be able to search interest by user', async(inject([InterestService], (service: InterestService) => {
    service.searchInterestByUser('test').subscribe((result) => {
      expect(result).toEqual(mockInterest)
    })
    const req = httpClient.expectOne(req => req.url.includes(`/search/interest/user`));
    expect(req.request.method).toBe('GET')
    req.flush(mockInterest);
    httpClient.verify();
  })));
  it('should be able to search interest', async(inject([InterestService], (service: InterestService) => {
    service.searchInterest('test').subscribe((result) => {
      expect(result).toEqual(mockInterest)
    })
    const req = httpClient.expectOne(req => req.url.includes(`/search/interest`));
    expect(req.request.method).toBe('GET')
    req.flush(mockInterest);
    httpClient.verify();
  })));
  it('should be able to search tags', async(inject([InterestService], (service: InterestService) => {
    service.searchTag('test').subscribe((result) => {
      expect(result).toEqual(mockInterestTags)
    })
    const req = httpClient.expectOne(req => req.url.includes(`/search/interest/tag`));
    expect(req.request.method).toBe('GET')
    req.flush(mockInterestTags);
    httpClient.verify();
  })));
  it('should be able to create interest', async(inject([InterestService], (service: InterestService) => {
    const payload = {
      name: 'test',
      detail: 'testDeatil'
    }
    service.createInterest(payload).subscribe((result) => {
      expect(result).toEqual(mockInterest[0])
    })
    const req = httpClient.expectOne(req => req.url.includes(`/interest/create/`));
    expect(req.request.method).toBe('POST')
    req.flush(mockInterest[0]);
    httpClient.verify();
  })));
  it('should be able to get interests by user', async(inject([InterestService], (service: InterestService) => {
    service.getUserInterests().subscribe((result) => {
      expect(result).toEqual(mockInterest)
    })
    const req = httpClient.expectOne(req => req.url.includes(`/interest/user`));
    expect(req.request.method).toBe('GET')
    req.flush(mockInterest);
    httpClient.verify();
  })));
  it('should be able to get recommended interests by it', async(inject([InterestService], (service: InterestService) => {
    service.getInterestRecommendationById(1).subscribe((result) => {
      expect(result).toEqual(mockInterest)
    })
    const req = httpClient.expectOne(req => req.url.includes(`/interest/recommend/1/`));
    expect(req.request.method).toBe('GET')
    req.flush(mockInterest);
    httpClient.verify();
  })));
  it('should be able to get recommended interests by all', async(inject([InterestService], (service: InterestService) => {
    service.getInterestRecommendation().subscribe((result) => {
      expect(result).toEqual(mockInterest)
    })
    const req = httpClient.expectOne(req => req.url.includes(`/interest/recommend/`));
    expect(req.request.method).toBe('GET')
    req.flush(mockInterest);
    httpClient.verify();
  })));
  it('should be able to get interest by ID without create', async(inject([InterestService], (service: InterestService) => {
    service.getInterestByID(3).subscribe((result) => {
      expect(result).toEqual(mockInterest[0])
    })
    const req = httpClient.expectOne(req => req.url.includes(`/interest/3/`));
    expect(req.request.method).toBe('GET')
    req.flush(mockInterest[0]);
    httpClient.verify();
  })));
  it('should be able to get interest by ID with create', async(inject([InterestService], (service: InterestService) => {
    service.getInterestByID(3, true).subscribe((result) => {
      expect(result).toEqual(mockInterest[0])
    })
    const req = httpClient.expectOne(req => req.url.includes(`/interest/3/`));
    expect(req.request.method).toBe('GET')
    req.flush(mockInterest[0]);
    httpClient.verify();
  })));
  it('testing interceptor with authorization token', inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem)
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem)
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem)
    localStorage.setItem(TOKEN_KEY, 'test')
    http.get('/test').subscribe(
      response => {
        expect(response).toBeTruthy();
      }
    );
    const req = httpMock.expectOne(r =>
      r.url === environment.apiURL + '/test' &&
      r.headers.has('Authorization') &&
      r.headers.get('Authorization') === `token test`);
    expect(req.request.method).toEqual('GET');
    req.flush({ hello: 'world' });
    httpMock.verify();
  }));
  it('testing interceptor without authorization token', inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
    http.get('/search/department/q=test').subscribe(
      response => {
        expect(response).toBeTruthy();
      }
    );
    const req = httpMock.expectOne(r =>
      r.url === environment.apiURL + '/search/department/q=test');
    expect(req.request.method).toEqual('GET');
    req.flush({ hello: 'world' });
    httpMock.verify();
  }));
});
