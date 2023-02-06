import { TestBed } from "@angular/core/testing";
import { ROOT_URL, UserService } from "./users.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { USERS } from "../mock/users.mock";

describe('Users Service',()=>{
    let service:UserService;
    let http:HttpTestingController;
    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[
                HttpClientTestingModule
            ]
        })
        service = TestBed.inject(UserService);
        http = TestBed.inject(HttpTestingController);
    });

    it('should service create',()=>{
        expect(service).toBeTruthy();
    })

    it('should get users',()=>{
        service.getUsers().subscribe(data=>{
            expect(data.length).withContext('Item should be 10').toBe(10)
        })

        const req = http.expectOne(ROOT_URL+'/users');
        expect(req.request.method).toBe('GET');
        req.flush(USERS);
    })
})