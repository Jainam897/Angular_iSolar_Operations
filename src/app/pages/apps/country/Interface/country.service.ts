import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { getuser } from './getuser';
import { Observable } from 'rxjs';
import { base_url, country_url } from 'src/app/global';

let headers = { 
  'content-type': 'application/json',
  'apikey':'API-KEY-SU-ISOLAR-PANEL',
  'sukey':'866b1023629f7b29933ef0d20a71ee7268bff6e362afa5e1443cbdd5ef',
  'reqfrom':'pnl'
} 


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  savecountrydetails(getus:getuser):Observable<getuser[]> {

    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    
        const body = JSON.stringify(getus)
        // console.log('headers', headers);
        console.log('body', body);

    return this.http.post<getuser[]>(`${base_url}/${country_url}`,  body, { 'headers': headers });

  }

  checkCountryName(countryName: any){
    const body = JSON.stringify(countryName);
    console.log(body);
    return this.http.post<any>(`${base_url}/${country_url}/checkCountryName`, body, { 'headers': headers });
    
  }

  listCountries(): Observable<getuser[]>{
    return this.http.post<getuser[]>(`${base_url}/${country_url}/selectList`, {},{ 'headers': headers });
  }

  getCountryById(id:any){
    console.log('id in service:', id);
    return this.http.post<getuser[]>(`${base_url}/${country_url}/detail`,JSON.stringify(id),{ 'headers': headers });
  }

  checkForDeleteCountry(_id:any){
    console.log('delete id:',_id);
    console.log('JSON:',JSON.stringify(_id));
    return this.http.post<getuser[]>(`${base_url}/${country_url}/checkForDelete`,JSON.stringify(_id),{ 'headers': headers });
  }


  deleteCountryData(_id:any){
    console.log('id in delete data:',_id)
    return this.http.delete<any>(`${base_url}/${country_url}/${_id}`,{ 'headers': headers });
  }

  checkForStatus(data) : Observable<getuser[]>

  {
    const body = JSON.stringify(data);
    console.log('body', body);
      return this.http.patch<any>(`${base_url}/${country_url}/`, body, { 'headers': headers })
  }

  ListCountriesWithdetail():Observable<getuser[]>{
    return this.http.post<getuser[]>(`${base_url}/${country_url}/table`, {}, { 'headers': headers });
  }

}
