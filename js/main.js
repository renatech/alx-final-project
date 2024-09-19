(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });


    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";

    $(window).on("load resize", function () {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
                function () {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function () {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });

})(jQuery);


document.addEventListener("DOMContentLoaded", function () {
    const users = [
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Doe", email: "jane@example.com" }
    ];

    const userTable = document.getElementById("userTable").getElementsByTagName('tbody')[0];

    function populateTable() {
        userTable.innerHTML = "";
        users.forEach(user => {
            const row = userTable.insertRow();
            row.insertCell(0).innerText = user.id;
            row.insertCell(1).innerText = user.name;
            row.insertCell(2).innerText = user.email;

            const actionsCell = row.insertCell(3);
            const viewBtn = document.createElement("button");
            viewBtn.innerText = "View";
            viewBtn.onclick = () => viewUser(user);
            actionsCell.appendChild(viewBtn);

            const updateBtn = document.createElement("button");
            updateBtn.innerText = "Update";
            updateBtn.onclick = () => openUpdateUserModal(user);
            actionsCell.appendChild(updateBtn);

            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Delete";
            deleteBtn.onclick = () => deleteUser(user.id);
            actionsCell.appendChild(deleteBtn);
        });
    }

    function viewUser(user) {
        const userInfo = document.getElementById("userInfo");
        userInfo.innerText = `ID: ${user.id}\nName: ${user.name}\nEmail: ${user.email}`;
        document.getElementById("viewUserModal").style.display = "block";
    }

    function deleteUser(id) {
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
            users.splice(index, 1);
            populateTable();
        }
    }

    function openUpdateUserModal(user) {
        document.getElementById("updateName").value = user.name;
        document.getElementById("updateEmail").value = user.email;
        document.getElementById("updateUserForm").onsubmit = function (event) {
            event.preventDefault();
            updateUser(user.id);
        };
        document.getElementById("updateUserModal").style.display = "block";
    }

    function updateUser(id) {
        const name = document.getElementById("updateName").value;
        const email = document.getElementById("updateEmail").value;
        const user = users.find(user => user.id === id);
        if (user) {
            user.name = name;
            user.email = email;
            populateTable();
            closeModal('updateUserModal');
        }
    }

    function closeModal(modalId) {
        document.getElementById(modalId).style.display = "none";
    }

    populateTable();
});






