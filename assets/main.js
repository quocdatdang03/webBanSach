window.addEventListener('DOMContentLoaded', function() {
    /*==========================Xử lý phần header======================== */
        /**==============================Xử lý khi click nút headerMenu =================================== */
        // Lấy ra overlay và headerMenu
        const overlay = document.querySelector('.overlay');
        const headerMenu = document.querySelector('.header__menu');
        // Lấy ra header
        const header = document.querySelector('#header')
        // Lấy ra nút btn menu 
        const btnHeaderMenu = document.querySelector('.header__content-list-menu');
        btnHeaderMenu.onclick = function() {
        header.classList.add('open');
        }

        // Lấy ra nút close 
        const btnHeaderClose = document.querySelector('.header__menu-close');
        btnHeaderClose.onclick = function() {
            header.classList.remove('open');
        }

        overlay.onclick = function() {
            header.classList.remove('open');
        }
         /**==============================End Xử lý khi click nút headerMenu =================================== */

        /**==============================Xử lý khi click nút btnSearch on mobile ================================ */
        // Lấy ra nút btn search 
        const btnSearch = document.querySelector('.header__content-btn-search')
        btnSearch.onclick = function() {
            header.classList.toggle('openBoxSearch');
        }
        /**==============================End Xử lý khi click nút btnSearch on mobile ============================= */
        /**============================== Xử lý khi click nút btn category ontablet and mobile =====================*/
        // Lấy ra headerCategory 
        const headerCategory = document.querySelector('.header__category');
        // Lấy ra nút btn category 
        const btnCategory = document.querySelector('.header__category-btn');
        btnCategory.onclick = function() {
            headerCategory.classList.toggle('open');
        }
    /*==========================End Xử lý phần header======================== */
    
    /*==========================Xử lý phần Slider======================== */
    // Khai báo biến chỉ số hiện tại 
    var chiSoHienTai = 0;
    // Lấy ra các slider__item 
    const sliderItemImgs = document.querySelectorAll('.slider__item-img');
    // Lấy ra các nút dot slider
    const dotItems = document.querySelectorAll('.dot__item');
    // Xử lý khi click vào dot Items 
    dotItems.forEach(dotItem => {
        dotItem.onclick = function() {
            // Xử lý active dot Item lên
            for(var i = 0; i < dotItems.length; i++) {
                dotItems[i].classList.remove('active');
            }
            this.classList.add('active');

            // Lấy ra vị trí hiện tại của slider dang co active 
            var sliderActive = this;
            for(var vitri =  0; sliderActive = sliderActive.previousElementSibling; vitri++) {

            }
            chiSoHienTai = vitri;
            
            for(var i = 0; i < sliderItemImgs.length; i++) {
                sliderItemImgs[i].classList.remove('active');
            }

            sliderItemImgs[vitri].classList.add('active');
        }
    })

    // auto slider 
    function autoSlider() {
        // Lấy ra slider đang có active 
        var sliderActive = document.querySelector('.slider__item-img.active');
        // Lấy ra vị trí hiện tại của slider đang active 
        for(var vitri = 0; sliderActive = sliderActive.previousElementSibling; vitri++) {

        }
        // Kiếm tra điều kiện : nếu mà vitri > độ dài của sliderItemImgs.length-1 thì cho về slider đầu
        //  Ngc lại thì cho slide tiếp theo hiển thị
        if(vitri < sliderItemImgs.length-1) {
            // Trước khi thêm thì bỏ tất cả slider có active trước đó đi
            for(var i = 0 ; i < sliderItemImgs.length; i++) {
                sliderItemImgs[i].classList.remove('active');
                dotItems[i].classList.remove('active');
            }
            sliderItemImgs[vitri].nextElementSibling.classList.add('active');
            dotItems[vitri].nextElementSibling.classList.add('active');
        }
        else {
                // Trước khi thêm thì bỏ tất cả slider có active trước đó đi
                for(var i = 0 ; i < sliderItemImgs.length; i++) {
                sliderItemImgs[i].classList.remove('active');
                dotItems[i].classList.remove('active');
            }
            sliderItemImgs[0].classList.add('active');
            dotItems[0].classList.add('active');
        }
    }
        var time = setInterval(autoSlider,4000)

    // Xử lý khi click nút next và previous 
    const btnNext = document.querySelector('.slider__btn.btn__next');
    const btnPrevious = document.querySelector('.slider__btn.btn__previous');
    var sliderActive = document.querySelector('.slider__item-img.active');
    // Biên xử lý lỗi khi click nhiều lần 1 lúc 
    var trangthai = 'dangDungYen';
    // Hàm xử lý click next 
    function nextSlider() {
        // khi click thì bỏ tư chuyển slide
        clearInterval(time);
        // Check xem chuyển động xong chưa nếu chưa thì phải chờ xong mới thực hiện code không thì return fasle
        if(trangthai == 'dangChuyenDong') {
            return false;
        }
        trangthai = 'dangChuyenDong';
        var trangThaiCua2ChuyenDong = 0;
        // Lấy ra phân tử hiện tại và phần tử tiếp theo :
        var phanTuHienTai = sliderItemImgs[chiSoHienTai];
        if(chiSoHienTai < sliderItemImgs.length-1) {
            chiSoHienTai++;
        }
        else {
            chiSoHienTai = 0;
        }
        var phanTuTiepTheo = sliderItemImgs[chiSoHienTai];

        phanTuHienTai.classList.add('bienMatKhiAnNext');
        phanTuTiepTheo.classList.add('diVaoKhiAnNext');
        phanTuTiepTheo.classList.add('active');

        // Xử lý khi kết thúc chuyển động 
        phanTuHienTai.addEventListener('webkitAnimationEnd', function() {
            this.classList.remove('active');
            this.classList.remove('bienMatKhiAnNext');
            trangThaiCua2ChuyenDong++; // = 1
            if(trangThaiCua2ChuyenDong == 2) {
                trangthai = 'dangDungYen';
            }
            // Nếu check xong 2 chuyển động đã xong thì cho biển trạng thái về lại ban đầu
        })

        phanTuTiepTheo.addEventListener('webkitAnimationEnd', function() {
            this.classList.remove('diVaoKhiAnNext');
            this.classList.add('active');
            trangThaiCua2ChuyenDong++; // = 2
            if(trangThaiCua2ChuyenDong == 2) {
                trangthai = 'dangDungYen';
            }
        })

        // adtive cho dot tương ứng
        for(var i = 0 ; i < dotItems.length; i++) {
            dotItems[i].classList.remove('active');
        }
        dotItems[chiSoHienTai].classList.add('active');
    } 

    // Hàm xử lý click previous 
    function previousSlider() {
        // khi click thì bỏ tư chuyển slide
        clearInterval(time);
        if(trangthai == 'dangChuyenDong') {
            return false;
        }
        trangthai = 'dangChuyenDong';
        var trangThaiCua2ChuyenDong = 0;

        var phanTuHienTai = sliderItemImgs[chiSoHienTai];
        if(chiSoHienTai > 0) {
            chiSoHienTai--;
        }
        else {
            chiSoHienTai = sliderItemImgs.length-1;
        }
        var phanTuTiepTheo = sliderItemImgs[chiSoHienTai];

        phanTuHienTai.classList.add('bienMatKhiAnPrevious');
        phanTuTiepTheo.classList.add('diVaoKhiAnPrevious');
        phanTuTiepTheo.classList.add('active');

        phanTuHienTai.addEventListener('webkitAnimationEnd', function() {
            this.classList.remove('active');
            this.classList.remove('bienMatKhiAnPrevious');
            trangThaiCua2ChuyenDong++;
            if(trangThaiCua2ChuyenDong == 2) {
                trangthai = 'dangDungYen';
            }
        })

        phanTuTiepTheo.addEventListener('webkitAnimationEnd', function() {
            this.classList.remove('diVaoKhiAnPrevious');
            this.classList.add('active');
            trangThaiCua2ChuyenDong++;
            if(trangThaiCua2ChuyenDong == 2) {
                trangthai = 'dangDungYen';
            }
        })

        for(var i = 0; i < dotItems.length ; i++) {
            dotItems[i].classList.remove('active');
        }
        dotItems[chiSoHienTai].classList.add('active');
    }

    btnNext.addEventListener('click', nextSlider);
    btnPrevious.addEventListener('click', previousSlider);
    /*==========================End Xử lý phần Slider======================== */

    /*========================== Xử lý phần product============================ */
    // Xử lý click vào nút tim thì đổi màu ==========
    // Lấy ra nút tim heart 
    const btnHearts = document.querySelectorAll('.product__book-buy-item:nth-child(2)');
    btnHearts.forEach(btnHeart => {
        btnHeart.onclick = function(e) {
            this.classList.toggle('active');
            e.stopPropagation();
        }
    })

    // Xử lý click vào nút giỏ hàng thì showModal Product
    // Lấy ra nút giỏ hàng 
    const btnCarts = document.querySelectorAll('.product__book-buy-item:nth-child(1)');
    // Lấy ra content  
    const content = document.querySelector('.content');
    btnCarts.forEach(btnCart => {
        btnCart.onclick = function(e) {
            content.classList.add('open');
            // Ngăn chặn hành hành vi show modal khi click vào tk cha  
            e.stopPropagation();
        }
    })
    // Xử lý ấn vào overlay vs btnClose thì tắt Modal
    const overlay2 = document.querySelector('.overlay-2');
    const modalCloseBtn = document.querySelector('.product__heading-close');
    // Hàm remove class open của content
    var removeOpen = function() {
        content.classList.remove('open');
        content.classList.remove('show');
        productModal.classList.remove('show');
        for(var i = 0 ; i < productModalContent.length; i++) {
            productModalContent[i].classList.remove('active');
        }
    }

    overlay2.addEventListener('click', removeOpen);
    modalCloseBtn.addEventListener('click', removeOpen);

    // Xử lý hiện lên modal tương ứng cho từng product 
    //  Lấy ra nút phóng to
    const btnShows = document.querySelectorAll('.product__book');
    const productModal = document.querySelector('.productModal');
    const productModalClose = document.querySelector('.productModal__close');
    const productModalContent = document.querySelectorAll('.productModal__item');
    const productModalImg = document.querySelector('.productModal__item img');
    console.log(productModalImg);
    const productModalName = document.querySelector('.productModal__content h1');
    const productModalDesc = document.querySelector('.productModal__content p');
    console.log(productModalContent);
    console.log(btnShows);
    const books = [
        {
            img: './assets/img/product__1.jpg',
            name: 'Chim Chóc chưa bao giờ ngốc',
            desc: '"Não chim có lẽ nhỏ, nhưng rõ ràng là “có võ”. Thật ra, ít có loài nào khác vừa có vẻ cẩn trọng lại vừa hoạt bát và tài năng và được trời phú cho nghị lực bền bỉ đến thế... Chim chóc đã tồn tại trong hơn 100 triệu năm. Chúng là một trong những câu chuyện thành công vĩ đại nhất của tự nhiên, phát minh ra những chiến lược sinh tồn mới, kiểu khôn khéo đặc trưng của riêng chúng mà, ít nhất ở một số khía cạnh, dường như vượt xa sự khôn khéo của loài người."',
        },
        {
            img: './assets/img/product__2.jpg',
            name: 'Phòng Trọ Ba Người (Tái bản năm 2022)',
            desc: 'Truyện kể về ba chàng trai là Nhiệm, Chuyên, Mẫn. Cả ba học chung với nhau lúc trung học phổ thông sau đó đã cùng nhau lên thành phố học đại học và ở cùng chung một phòng trọ. Truyện chủ yếu kể lại mối tình phòng trọ của ba chàng cho ba cô gái, những cô gái ấy là Thu Thảo, Sương và Thủy.',
        },
        {
            img: './assets/img/product__3.jpg',
            name: 'Nữ sinh',
            desc: 'Một sự bất ngờ, Gia được cử về làm giáo viên chủ nhiệm lớp Xuyến, Thục, Cúc Hương. Ba cô hoảng hồn vì thời gian qua đã “hành hạ” Gia bằng đủ trò nghịch ngợm của mình. Hùng quăn không dám đến lớp vì đã có lần đón đường ném đá Gia gây thương tích. Không chịu nổi người dượng ghẻ. Hùng bỏ nhà ra đi. Với tấm lòng cao thượng. Gia đón Hùng về nhà ở chung với mình. Cuối cùng ba cô bạn cũng tìm ra chỗ ở của Gia. Họ sôi nổi bàn chuyện đi cắm trại và xem phim cho cả lớp.',
        },
        {
            img: './assets/img/product__4.jpg',
            name: 'Những Cô Em Gái',
            desc: 'Nếu những năm đầu cấp ba, Khoa đắm đuối với Gia Khanh  cô hoa hồng xứ khác - thì vào năm cuối, Khoa từ quê ra thành phố học và nhanh chóng trở thành chàng chăn cừu, đêm đêm nhìn bóng nàng Stephanette in qua rèm cửa sổ. Những bài đầu tiên Khoa tập tễnh làm gửi cho báo và được đăng cũng chính là tâm sự của Khoa với nàng Stephanette kia. Và nhờ những bài thơ ấy, Khoa trở nên nổi tiếng trong lớp, được những cậu bạn cùng lớp cậy nhờ làm thơ gửi cho cô em gái của họ nhưng thực chất là gửi cho người yêu. Nhưng cũng tại những bài thơ đó mà Khoa biết được sự thật phũ phàng về người con gái mà cậu “si” bấy lâu nay.',
        },
        {
            img: './assets/img/product__5.jpg',
            name: 'Hoàng tử bé',
            desc: 'Hoàng tử bé sống trên tiểu tinh cầu B612. Ở đó có ba ngọn núi lửa (hai ngọn đang hoạt động còn ngọn kia thì không) và một bông hoa hồng. Cậu chăm sóc cho tiểu hành tinh của mình hằng ngày, nhổ hết các cây bao báp định bám rễ, mọc lên tại đây. Những cái rễ đó sẽ xói đục hành tinh và làm cho thế giới cậu đang sống bị xé rách ra. Một ngày nọ, hoàng tử bé đã rời hành tinh của mình và đi xem phần còn lại của vũ trụ xem như thế nào và đã tới một vài tiểu tinh cầu khác',
        },
        {
            img: './assets/img/product__6.jpg',
            name: 'Nam Thiên Kì Đàm',
            desc: '“Trời đất thiên địa sinh ra vạn vật trên đời. Lẫn giữa người phàm, đã có bậc thánh nhân, tiên Phật oai linh, thì cũng sẽ có những loài yêu ma quỷ quái dị thường.',
        },
        {
            img: './assets/img/product__7.jpg',
            name: 'AI GỬI CÁNH THƯ VÀO TRONG MÂY',
            desc: 'Thời thơ ấu của Trác Ưu luôn phảng phất bóng dáng của Lục Tây Dương, là cậu bé thường xuyên bắt nạt cô ở trường mẫu giáo, cũng là cậu bé đem lại cho cô nhiều niềm vui nhất. Những trò nghịch ngợm ấy khiến cả hai trở nên thân thiết với nhau hơn.',
        },
        {
            img: './assets/img/product__8.jpg',
            name: '2030: Những xu hướng lớn sẽ định hình thế giới tương lai',
            desc: 'Thế giới mà chúng ta sống đang thay đổi nhanh hơn bao giờ hết. Nếu như ngày trước, con người mất hàng nghìn năm để hình thành các xã hội sơ khai, thì giờ đây, chỉ trong khoảng thời gian nửa thế kỉ, một người có thể chứng kiến biết bao cuộc chiến bừng lên rồi dập tắt, biết bao thể chế từ lúc hưng thịnh cho đến khi suy tàn.',
        },

        {
            img: './assets/img/product__el-1.jpg',
            name: 'The City In The Middle Of The Night',
            desc: 'LOCUS AWARD FINALIST! “This generation’s Le Guin.” ―Andrew Sean Greer, Pulitzer Prize-winning author of  Less Charlie Jane Anders, the nationally bestselling author of  All the Birds in the Sky  delivers a brilliant new novel set in a hauntingly strange future with #10',
        },
        {
            img: './assets/img/product__el-2.jpg',
            name: 'The Night Before',
            desc: 'A Today Show and  New York Post  Summer Reads Selection!  One of: Us Weekly. The Best Psychological Thrillers to Add to Your TBR',
        },
        {
            img: './assets/img/product__el-3.jpg',
            name: 'Blame The Dead',
            desc: 'Blood Sisters: A Novel   Three little girls. One accident. A lifetime of lies. From the bestselling author of  The Dead Ex . Three little girls set off to school one sunny morning. Within an hour, one of them is dead. Fifteen years later, Kitty cant speak and has no memory',
        },
        {
            img: './assets/img/product__el-4.jpg',
            name: 'Blood Sisters: A Novel',
            desc: 'Blame The Dead   Ed Ruggeros  Blame the Dead  is the thrilling start of an action-packed and timely World War II series by a former Army Officer for fans of compelling historical fiction. Set against the heroism and heartbreak of World War II, former Army officer Ed Ruggero...',
        },
        {
            img: './assets/img/product__el-5.jpg',
            name: 'Classics Reimagined: Frankenstein (The 200th Anniversary Edition)',
            desc: 'Classics Reimagined: Frankenstein (The 200th Anniversary Edition)   With detailed and evocative imagery, renowned artist David Plunkert takes readers on a dark journey into the greatest novel in the monster genre,  Frankenstein . Celebrating the bicentennial anniversary',
        },
        {
            img: './assets/img/product__el-6.jpg',
            name: 'The Tangled Lands',
            desc: 'The Tangled Lands   WINNER OF THE WORLD FANTASY AWARD FOR BEST COLLECTION From award-winning and  New York Times  bestselling authors Paolo Bacigalupi and Tobias Buckell comes a fantasy novel told in four parts about a land crippled by the use of magic',
        },
        {
            img: './assets/img/product__el-7.jpg',
            name: 'Freefall: A Novel',
            desc: 'Freefall: A Novel   A MOST ANTICIPATED BOOK OF 2019:   Entertainment Weekly  |  USA Today  |  Parade  |  Cosmopolitan  |  New York Post  | PopSugar | Goodreads   “Jessica Barry’s  Freefall  is not only an enthralling, impossible-to-put down mystery',
        },
        {
            img: './assets/img/product__el-8.jpg',
            name: 'Two Dead',
            desc: 'Two Dead   From the acclaimed DC Comics writer and the artist of the #1  New York Times  bestselling and National Book Award–winning illustrated trilogy March comes a stunning crime noir graphic novel exploring the intertwining threads of crime, conspiracy, racism,',
        },
        {
            img: './assets/img/product__el-9.jpg',
            name: 'Barack And Joe',
            desc: 'Steve Martis New York Times bestseller Shopgirl is now a major motion picture, in theaters October 05, starring Steve Martin and Claire Danes.Mirabelle is the of the title, a young woman, beautiful in a wallflowerish kind of way, who works behind the glove counter at Neiman Marcus',
        },
        {
            img: './assets/img/product__el-10.jpg',
            name: 'Rebel Talent',
            desc: 'The bestselling author of Collapse and Guns, Germs and Steel surveys the history of human societies to answer the question: What can we learn from traditional societies that can make the world a better place for all of us?',
        },
        {
            img: './assets/img/product__el-11.jpg',
            name: 'Questions Are The Answer',
            desc: 'One of the worlds most esteemed and influential psychologists, Roy F. Baumeister, teams with New York Times science writer John Tierney to reveal the secrets of self-control and how to master it',
        },
        {
            img: './assets/img/product__el-12.jpg',
            name: 'A World Without Work',
            desc: 'Time #1 Nonfiction Book of 2007 Entertainment Weekly #1 Nonfiction Book of 2007 Finalist for the 2007 National Book Critics Circle Award Salon Book Awards 2007 Amazon Top 100 Editors Picks of 2007 (#4)',
        },
    ];
    var currentIndex = 0;
    
    // function render ra nội dung cho Modal product 
    function render() {
        productModalImg.src = books[currentIndex].img;
        productModalName.innerText = books[currentIndex].name;
        productModalDesc.innerText = books[currentIndex].desc;
    }
    btnShows.forEach((btnShow,index) => {
        btnShow.onclick = function() {
            currentIndex = index;
            render();
            productModal.classList.add('show');
            content.classList.add('show');
        }
    })

    productModalClose.onclick = function() {
        productModal.classList.remove('show');
        content.classList.remove('show');
        for(var i = 0 ; i < productModalContent.length; i++) {
            productModalContent[i].classList.remove('active');
        }
    }
    /*========================== End Xử lý phần product======================== */


    /**====================== Xử lý khi cuộn chuột scroll =======================*/
     // Lấy ra nút scroll top
     const btnScrollTop = document.querySelector('.btn__scroll-top');

    // Lấy ra phần header__content 
    const headerContent = document.querySelector('.header__content');
    var trangthaiHeaderContent = 'duoivitri';
    var vitriHeaderContent = headerContent.offsetTop;
    window.addEventListener('scroll', function() {
        if(window.pageYOffset > vitriHeaderContent) {
            if(trangthaiHeaderContent == 'duoivitri') {
                trangthaiHeaderContent = 'trenvitri';
                headerContent.classList.add('fixed');
                headerCategory.classList.add('fixed');
            }
        }
        else {
            if(trangthaiHeaderContent == 'trenvitri') {
                trangthaiHeaderContent = 'duoivitri';
                headerContent.classList.remove('fixed');
                headerCategory.classList.remove('fixed');
            }
        }        


        // Xử lý các heading và banner của product chuyển động khi scroll :
        const productTiengViet = document.querySelector('.product#SachTiengViet');
        var vitriProductTV = productTiengViet.offsetTop-500;
        const productEnglish = document.querySelector('.product#EnglishBook');
        var vitriProductEL = productEnglish.offsetTop-500;
        const productVPP = document.querySelector('.product#VPP');
        var vitriProductVPP = productVPP.offsetTop-500;
        const productDoChoi = document.querySelector('.product#DoChoi');
        var vitriproductDoChoi = productDoChoi.offsetTop-500;
        const productBangDia = document.querySelector('.product#BangDia');
        var vitriproductBangDia = productBangDia.offsetTop-500;
        const productHeadings = document.querySelectorAll('.product__heading-text');
        const productBanners = document.querySelectorAll('.product__banner');
         //  Xử lý các product__book chuyển động khi scroll 
        // Lấy ra product__book Tieng viet
        const bookTv = document.querySelectorAll('.product__book.book__tv');
        // Lấy ra product__book English 
        const bookEl = document.querySelectorAll('.product__book.book__el');
        // Lấy ra product__book English 
        const bookVpp = document.querySelectorAll('.product__book.book__vpp');
        // Lấy ra product__book toy (do choi) 
        const bookToy = document.querySelectorAll('.product__book.toy');
         // Lấy ra product__book DVD (bang dia)
         const bookDVD = document.querySelectorAll('.product__book.DVD');

        if(window.pageYOffset > vitriProductTV) {
            productHeadings[0].classList.add('slide');
            productBanners[0].classList.add('scale');
            productBanners[1].classList.add('scale');
            for(var i = 0; i < bookTv.length; i++) {
                bookTv[i].classList.add('dilen');
            }
        }
        if(window.pageYOffset > vitriProductEL) {
            productHeadings[1].classList.add('slide');
            productBanners[2].classList.add('scale');
            productBanners[3].classList.add('scale');
            for (var i = 0; i < bookEl.length; i++) {
                bookEl[i].classList.add('dilen');
            }
        }
        if(window.pageYOffset > vitriProductVPP) {
            productHeadings[2].classList.add('slide');
            for (var i = 0; i < bookVpp.length; i++) {
                bookVpp[i].classList.add('dilen');
            }
        }
        if(window.pageYOffset > vitriproductDoChoi) {
            productHeadings[3].classList.add('slide');
            for (var i = 0; i < bookToy.length; i++) {
                bookToy[i].classList.add('dilen');
            }
        }
        if(window.pageYOffset > vitriproductBangDia) {
            productHeadings[4].classList.add('slide');
            productBanners[4].classList.add('scale');
            for (var i = 0; i < bookDVD.length; i++) {
                bookDVD[i].classList.add('dilen');
            }
        }

        // Ẩn hiện nút scroll to top 
        if(window.pageYOffset > 100) {
            btnScrollTop.style.transform = 'translateX(0)';
        }
        else {
            btnScrollTop.style.transform = 'translateX(200px)';
        }
    })

    // Xử lý click vào btnScrollTop thì quay lại đầu trang 
    function scrollTop() {
        header.scrollIntoView({behavior : "smooth", block : "start", inline : "nearest"});
    }
    btnScrollTop.addEventListener('click',scrollTop);
    /**====================== End Xử lý khi cuộn chuột scroll =======================*/
})


