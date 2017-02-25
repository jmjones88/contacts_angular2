import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { TestBed, async } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';

import { Observable } from 'rxjs/Observable';

import { ContactService, Contact } from './index';

export function main() {
  describe('Contact Service', () => {
    let contactService: ContactService;
    let mockBackend: MockBackend;

    beforeEach(() => {

      TestBed.configureTestingModule({
        providers: [
          ContactService,
          MockBackend,
          BaseRequestOptions,
          {
            provide: Http,
            useFactory: (backend: ConnectionBackend, options: BaseRequestOptions) => new Http(backend, options),
            deps: [MockBackend, BaseRequestOptions]
          }
        ]
      });
    });

    it('should return an Observable when get called', async(() => {
      expect(TestBed.get(ContactService).get()).toEqual(jasmine.any(Observable));
    }));

    it('should resolve to a contact when get called', async(() => {

      let contactService = TestBed.get(ContactService);
      let mockBackend = TestBed.get(MockBackend);
      contactService.clear();
      mockBackend.connections.subscribe((c: any) => {
        c.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify([{
            "type": 'Executive',
            "name": 'Ann Brown',
            "title": 'CEO',
            "phone": '(512) 456-5555',
            "ext": '',
            "fax": "(512) 456-5555",
            "email": "Executive"
          }])})));
      });

      contactService.get().subscribe((data: any) => {
        let contact: Contact = new Contact(
          'Executive',
          'Ann Brown',
          'CEO',
          '(512) 456-5555',
          '',
          '(512) 456-5555',
          'Executive');
        let contactArr = new Array(contact);
        expect(data).toEqual(contactArr);
      });
    }));
  });
}
