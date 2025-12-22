ช่วยเขียน TODO สำหรับโปรเจค /Users/marosdeeuma/nextflix-nextjs

สร้างเว็บแอพ netflix clone (Streaming Service)

ใส่ทุกฟีเจอร์ที่คิดว่าเว็บแอพระดับโลกเขามีและทำกันนะครับ

โดยให้ทำ Master Data และ mock repo ด้วย mock data แล้วค่อยมาต่อ supabase repo หลังจาก ดีไซน์ ครบทุกหน้าแล้ว

โดยทุกครั้งที่สร้าง page.tsx ต้องทำตาม rule ที่เขียนไว้ที่ /Users/marosdeeuma/nextflix-nextjs/prompt/CREATE_PAGE_PATTERN.md

ตามหลัก SOLID Clean

เริ่มพัฒนาโปรเจคอันดับแรกเลย ต้องสร้างหน้า Layout 2 แบบคือ MainLayout และ RetroLayout โดยแต่ละ Layout ต้องพร้อม Header Footer และใส่ Theme Toggle เพื่อทำ dark mode (ใช้ next-themes)

MainLayout และ RetroLayout ต้องให้ออกแบบให้ เป็น Full screen ห้าม scroll อารมณ์เหมือนใช้เว็บแอพ

โดย RetroLayout ให้ออกแบบ interface เหมือน Internet Explorer 5 Browser ตามรูป /Users/marosdeeuma/nextflix-nextjs/prompt/internet_explorer_5_on_windows_98.png

ส่วน MainLayout ให้ออกแบบ interface ให้ทันสมัย โดยสามารถใช้ react-spring สำหรับทำ animation เช่น carousel, hover animation, hover effect ต่างๆ

ทั้ง MainLayout และ RetroLayout ต้องมีการสร้าง Reuse Component (พวก Modal, Form, Input, Select, Popover) ให้สไตล์อิงตาม MainLayout  เตรียมไว้ใช้ในหน้าอื่นๆด้วย 

ให้ใช้ tailwindcss สำหรับทำ style ที่ /Users/marosdeeuma/nextflix-nextjs/public/styles/index.css แยกไฟล์ css 2 ไฟล์ คือ main-layout.css และ retro-layout.css

จากนั้น สร้างหน้าแรก ที่เป็นหน้ารวม content ทุกอย่าง เพื่อสำหรับเข้าถึงคอนเทนต์ที่น่าสนใจ และเป็น UX ที่ดี ด้วยคับ

