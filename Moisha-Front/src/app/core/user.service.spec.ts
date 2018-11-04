import {TestBed, inject, async} from '@angular/core/testing';

import {DepartmentSearchResponse, UserService} from './user.service';
import {HttpClient, HttpClientModule, HttpParams} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

const mockDepartment = [{ id: '1', name: 'test'}];
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
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let userService: UserService;
  const todoApi = '/search/department';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    userService = TestBed.get(UserService);
  });

  fit('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
  fit('test search department', async(inject([UserService], (service: UserService) => {
      service.searchDepartment('test').subscribe(
        result => {
          return expect(result).toEqual(mockDepartment);
        })
      const req = httpTestingController.expectOne('/search/department?q=test');
      expect(req.request.method).toEqual('GET');
      req.flush(mockDepartment);
    })
  ));
  afterEach(() => {
    httpTestingController.verify();
  });
});
