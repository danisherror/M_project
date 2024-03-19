import React from 'react';
import '../css/navbar.css'
export default function Landing() {
    return (
        <div>
            <div class="nav">
                <input type="checkbox" id="nav-check" />
                <div class="nav-header">
                    <div class="nav-title">
                        {/* JoGeek */}
                    </div>
                </div>
                <div class="nav-btn">
                    <label for="nav-check">
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>
                </div>

                <div class="nav-links">
                    <a href="http://localhost:3000/ahomepage">HomePage</a>
                    <a href="http://localhost:3000/getallStudents">Hostel Status</a>
                    <a href="http://localhost:3000/getStudentFeedback">FeedBacks</a>
                    <a href="http://localhost:3000/getstudentroomissues">Room Issues</a>
                    <a href="http://localhost:3000/">Logout</a>
                </div>
            </div>
        </div>
    );
}
