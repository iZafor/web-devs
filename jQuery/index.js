$("body").addClass("dark-bg");
const heading = $("h1");
heading.addClass("center-text big-heading");

const buttons = $("button");
buttons.css("cursor", "pointer");
buttons.click(
    () => {
        $("h1").animate(
            {
                fontSize: "5rem"
            },
            1000,
            () => {
                $("h1").animate(
                    {
                        fontSize: "10rem"
                    },
                    1000
                )
            }
        );
    }
);


$("a").attr(
    {
        href: "https://www.google.com/",
        style: "text-decoration: none; color: #fff;"
    }
);

$(document).keypress(
    (event) => {
        heading.text(event.key);
    }
);