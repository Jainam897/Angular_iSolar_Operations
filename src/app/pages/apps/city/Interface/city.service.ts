import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { getuser } from './getuser';
import { Observable } from 'rxjs';
import { base_url, city_url, state_url } from 'src/app/global';

let headers = { 
  'content-type': 'application/json',
  'apikey':'API-KEY-SU-ISOLAR-PANEL',
  'sukey':'866b1023629f7b29933ef0d20a71ee7268bff6e362afa5e1443cbdd5ef',
  'reqfrom':'pnl'
} 

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  listCities(): Observable<getuser[]>{
    return this.http.post<getuser[]>(`${base_url}/${city_url}/selectList`, {},{ 'headers': headers });
  }

  checkForDeleteCity(_id:any){
    console.log('delete id:',_id);
    console.log('JSON:',JSON.stringify(_id));
    return this.http.post<getuser[]>(`${base_url}/${city_url}/checkForDelete`,JSON.stringify(_id),{ 'headers': headers });
  }

  deleteCityData(_id:any){
    console.log('id in delete data:',_id)
    return this.http.delete<any>(`${base_url}/${city_url}/${_id}`,{ 'headers': headers });
  }

  savecitydetails(data):Observable<getuser[]> {

    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    
        const body = JSON.stringify(data)
        // console.log('headers', headers);
        console.log('body', body);

    return this.http.post<getuser[]>(`${base_url}/${city_url}`,  body, { 'headers': headers });

  }
  getCitywithStateWithCountry() :Observable<getuser[]>{
    return this.http.post<getuser[]>(`${base_url}/${city_url}/table`, {}, { 'headers': headers });
  }

  getCityById(id:any){
    const tempData = {_id : id}
    console.log('tempData in service:', tempData);
    return this.http.post<getuser[]>(`${base_url}/${city_url}/detail`,JSON.stringify(tempData),{ 'headers': headers });
  }
  checkForCityStatus(data) : Observable<getuser[]>
  {
    const body = JSON.stringify(data);
    console.log('body', body);
      return this.http.patch<any>(`${base_url}/${city_url}/`, body, { 'headers': headers })
  }
  checkCityName(cityName: any){
    const body = JSON.stringify(cityName);
    console.log(body);
    return this.http.post<any>(`${base_url}/${city_url}/checkCityName`, body, { 'headers': headers });
    
  }

  checkCountrywiseState(data){
    const body = JSON.stringify(data);
    console.log('body::', body);
    return this.http.post<any>(`${base_url}/${state_url}/selectList`, body, { 'headers': headers });
  }
}
