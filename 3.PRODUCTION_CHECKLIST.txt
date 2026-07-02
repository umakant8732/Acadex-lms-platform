Acadex Production Checklist

Domain and SSL
[ ] https://acadexlearning.xyz opens successfully
[ ] https://www.acadexlearning.xyz opens successfully
[ ] HTTP redirects to HTTPS
[ ] Browser shows valid SSL certificate

Core Infra
[ ] Nginx is serving frontend correctly
[ ] Backend API is reachable through domain
[ ] PM2 backend process is online
[ ] PM2 worker process is online
[ ] Redis is connected
[ ] MongoDB Atlas is connected

Authentication
[ ] Student registration works
[ ] Teacher registration works
[ ] Login works
[ ] Refresh keeps user logged in after page reload
[ ] Logout works
[ ] Protected routes block unauthenticated access
[ ] Cookies are working correctly over HTTPS

Teacher - Course Module
[ ] Create course works
[ ] Update course works
[ ] Delete course works
[ ] Publish / unpublish works
[ ] Course filters and pagination work
[ ] Course thumbnail upload works
[ ] Thumbnail replace works

Teacher - Lecture Module
[ ] Manage lecture courses page loads
[ ] Course curriculum page loads
[ ] Lecture upload button opens file picker
[ ] Video upload to S3 works
[ ] Complete upload API works
[ ] Worker picks transcode job
[ ] HLS files upload to S3 / CloudFront works
[ ] Processing status appears live
[ ] Ready status updates without manual refresh
[ ] Failed status updates correctly if processing breaks
[ ] Teacher preview playback works

Student - Catalog and Access
[ ] Published courses list loads
[ ] Course preview page loads
[ ] Student course library page loads
[ ] Continue flow opens watch page
[ ] Preview lesson can be played without purchase when allowed
[ ] Locked lessons stay protected without enrollment

Student - Watch Experience
[ ] Watch page opens correctly
[ ] Video player loads
[ ] HLS playback works
[ ] Lesson switching works
[ ] Active lesson highlight works
[ ] Course content sidebar works
[ ] Description / Resources / Comments tabs render correctly

Payment and Enrollment
[ ] Create payment order API works
[ ] Razorpay checkout opens
[ ] Successful payment verifies correctly
[ ] Enrollment document is created after successful payment
[ ] Duplicate purchase is blocked
[ ] Failed payment is recorded with failure reason
[ ] Enrolled student gets access to full course

Storage and Media
[ ] S3 CORS works for thumbnail upload
[ ] S3 CORS works for lecture upload
[ ] CloudFront playback URLs work
[ ] CloudFront signed playback works for protected lectures
[ ] Temporary local transcode files are cleaned after processing

Realtime and Background Jobs
[ ] Socket connection works on production domain
[ ] Lecture processing events reach frontend
[ ] Ready / failed lecture status sync works across backend + worker
[ ] PM2 restarts processes automatically after reboot

Manual Smoke Test
[ ] Register a fresh teacher account
[ ] Create a course
[ ] Upload thumbnail
[ ] Add lecture video
[ ] Wait for ready status
[ ] Preview lecture as teacher
[ ] Register a fresh student account
[ ] Open course preview page
[ ] Buy course successfully
[ ] Open student watch page
[ ] Play lecture successfully

Operational Checks
[ ] pm2 list shows backend and worker online
[ ] pm2 logs show no critical runtime errors
[ ] Nginx test passes
[ ] Domain DNS records point correctly
[ ] Security group keeps only 80/443 public
[ ] SSH is restricted back to My IP

Later Production Improvements
[ ] Razorpay webhook setup
[ ] Payment confirmation email
[ ] Invoice email after successful purchase
[ ] Replace lecture video flow
[ ] Delete lecture / media flow
[ ] Retry failed processing flow
[ ] Multi-quality HLS variants
[ ] Better production monitoring and alerts
