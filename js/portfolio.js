// --- Custom Elements (Header/Footer) ---

class MyFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer>
            <div class="site-footer" >
                <p data-aos="fade-up" data-aos-duration="1100">&copy; Copyright <span id="current-year"> </span>- Theerapat Karinta. สงวนลิขสิทธิ์.</p>
            </div>
        </footer>
        `;
        // อัปเดตปีปัจจุบันเมื่อ Custom Element ถูกสร้าง
        document.getElementById('current-year').textContent = new Date().getFullYear();
    }
}
customElements.define("my-footer", MyFooter);

class MyHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header class="profile-header">
            <div class="logo" onclick="location.href='index.html'">
                <img src="images/About me/me.jpg" alt="Profile Picture" class="logo-img">
                <h3>Theerapat Karinta</h3>
                <i class="fa-solid fa-house fa-beat fa-xl" style="color: #d7774a;"></i>
            </div>
        </header>
        `;
    }
}
customElements.define("my-header", MyHeader);

class MyHeader2 extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header class="profile-header">
            <div class="logo" onclick="history.back()">
                <img src="images/About me/me.jpg" alt="Profile Picture" class="logo-img">
                <h3>Back</h3>
                <i class="fa-solid fa-circle-left fa-2xl" style="color: #d7774a;"></i>
            </div>
        </header>
        `;
    }
}
customElements.define("my-header2", MyHeader2);

// --- DOM Content Logic ---

document.addEventListener('DOMContentLoaded', () => {
    // --- Tab Switching Logic (สำหรับ index.html) ---
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    navTabs.forEach(tab => {
        tab.addEventListener('click', (event) => {
            const targetId = event.target.dataset.content;
            
            navTabs.forEach(tab => tab.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            const activeTab = document.querySelector(`.nav-tab[data-content="${targetId}"]`);
            if (activeTab) {
                activeTab.classList.add('active');
            }

            const activeContent = document.getElementById(targetId);
            if (activeContent) {
                activeContent.classList.add('active');
            }
        });
    });

    // --- Modal Logic for Image Gallery (สำหรับ index.html และ veakan.html) ---
    // เปลี่ยน selector ให้รวมรูปภาพใน .myimages-grid และ .portfolio3-grid
    const galleryImages = document.querySelectorAll('.myimages-grid img, .portfolio3-grid img');
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeBtn = imageModal ? imageModal.querySelector('.close-btn') : null;

    if (galleryImages.length > 0 && imageModal) {
        
        galleryImages.forEach(img => {
            img.addEventListener('click', function() {
                // ดึง source ของรูปภาพที่ถูกคลิก
                modalImage.src = this.src;
                // แสดง Modal
                imageModal.classList.add('show');
                document.body.style.overflow = 'hidden';
            });
        });

        // Event listener สำหรับปุ่มปิด 'x'
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                imageModal.classList.remove('show');
                document.body.style.overflow = 'auto';
            });
        }
        
        // Event listener สำหรับปิด Modal เมื่อคลิกที่พื้นหลัง
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                imageModal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Event listener สำหรับปิด Modal ด้วยปุ่ม ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && imageModal.classList.contains('show')) {
                imageModal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    }
});