import {TestBed, inject, async} from '@angular/core/testing';

import {DepartmentSearchResponse, UserService} from './user.service';
import {HttpClient, HttpClientModule, HttpParams} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

const mockDepartment = [{ id: '1', name: 'test'}];
const mockUser = [{id: '1', name: 'test'}]
export class UserServcie {
  constructor(private http: HttpClient) {}
  searchDepartment() {
    const params = new HttpParams().set('q', 'test')
    return this.http.get('search/department',{
      params
      })
  }
}
describe('UserService', () => {
  let httpClient;
  const todoApi = '/search/department';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [UserService]
    });
    httpClient = TestBed.get(HttpTestingController)
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
  it('should be able to search department', async(inject([UserService], (service: UserService) => {
      service.searchDepartment('test').subscribe(
        result => {
          return expect(result).toEqual(mockDepartment);
        })
    const req = httpClient.expectOne(req => req.url.includes(`/search/department`));
      expect(req.request.method).toEqual('GET');
      req.flush(mockDepartment);
    })
  ));
  it('should be able to get user by interest with limit', async(inject([UserService], (service: UserService) => {
      service.getUserByInterest(3, 3).subscribe(
        result => {
          return expect(result).toEqual(mockUser);
        })
      const req = httpClient.expectOne(req => req.url.includes(`/user/interest/3/`));
      expect(req.request.method).toEqual('GET');
      req.flush(mockUser);
    })
  ));
  it('should be able to get user by interest without limit', async(inject([UserService], (service: UserService) => {
      service.getUserByInterest(3).subscribe(
        result => {
          return expect(result).toEqual(mockUser);
        })
      const req = httpClient.expectOne(req => req.url.includes(`/user/interest/3/`));
      expect(req.request.method).toEqual('GET');
      req.flush(mockUser);
    })
  ));
});
