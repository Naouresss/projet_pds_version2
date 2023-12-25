import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URLS } from './api.url.config';
import { Meeting } from '../models/Meeting';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  constructor(private http: HttpClient, private user: AccountService) { }

  getAllMeetings(): Observable<any> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.user.getToken()
      });
    return this.http.get(API_URLS.MEETING_URL,  { headers });
  }

  getMeetingById(id: string): Observable<Meeting> {
    return this.http.get<Meeting>(`${API_URLS.MEETING_URL}/${id}`);
  }

  addMeeting(meeting: Meeting): Observable<any> {
    return this.http.post<any>(API_URLS.MEETING_URL, meeting);
  }

  deleteMeeting(id: any): Observable<Meeting> {
    return this.http.delete<Meeting>(`${API_URLS.MEETING_URL}/${id}`);
  }

  updateMeeting(id: string, updatedMeeting: Meeting): Observable<Meeting> {
    return this.http.put<Meeting>(`${API_URLS.MEETING_URL}/${id}`, updatedMeeting);
  }
  getAllUtilisateurs(): Observable<any> {
    return this.http.get(API_URLS.USER_URL + '/users');
  }
  updateRoleInMeeting(userId: string, newRole: string): Observable<string> {
    // Adjust the endpoint based on your API design
    return this.http.patch<string>(`${API_URLS.MEETING_URL}/${userId}/update-role`, { newRole });
  }
  getMeetingsByOrganizerId(organizerId: string): Observable<Meeting[]> {
    const url = `${API_URLS.MEETING_URL}/organizer?organizerId=${organizerId}`;
    return this.http.get<Meeting[]>(url);
  }
}
