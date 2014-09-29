# A Look Around

### Welcome to bsJS.

What can bsJS do?

Check at the <a href='http://projectbs.github.io/bsShowCase/' target='_blank'>ShowCase</a>.

![bsShowCase ScreenShot](http://i.imgur.com/07Yf9kx.png)


If you use bsJS, you can quickly and easily make what's in the ShowCase.

# Getting Your Hands On It

Do you wanna get your hands dirty?

There are two ways for actually getting it.

## Download

This is the recommended method. 

Once you download the Core and samples you can do whatever you wish.

This refers to bs.js in bsJs, bsShowCase and bsJSTest.

You need to set up your folder structure as below:

    ANY-FOLDER
          └----bsJS           
          └----bsShowCase
          └----bsJSTest

In `ANY-FOLDER`, the commands:

>git clone https://github.com/projectBS/bsJS.git

>git clone https://github.com/projectBS/bsJSTest.git

>git clone https://github.com/projectBS/bsShowCase.git

all work.

## Just using it

1. Include bsJs throught a `<script>` tag in an HTML document.

        <script src="http://projectbs.github.io/bsJS/bsjs.0.6.js"></script>

2. You can use bsJS in the following format:

        <script>
        bs( function() {
            // Write bsJS code here
        } );
        </script>

### Simple Example

- Generate the DOM and set up the style, content and an event listener!

        <script>
        bs( function(){
            bs.Dom( '<div></div>' ).S( 
                '<', 'body', // body parent
                'html', '안녕', // html input
                'width', 300, // style
                'click', function( $e ){ alert('초간단 초고성능 bsJS!'); } // event
            );
        } );
        </script>


# Sprouting

Now it's bsJS' time to sprout.

## Getting bsJSTest Push Permission

Don't just have fun locally, upload your demos directly.

bsJSTest web page is <a href='http://projectbs.github.io/bsJSTest/0.6/' target='_blank'><b>here</b></a>. Isn't it cool? ^^

In order to get Push permission: <a href='https://www.facebook.com/photo.php?fbid=828142343867893' target='_blank'><b>ask 'bsJSTest Push 권한 주세요' here with your Github ID</b></a>.

# Reference

## Wiki

<a href='https://github.com/projectBS/bsJS/wiki' target='_blank'>bsJS Wiki</a>

## Error Code table
<a href='https://docs.google.com/spreadsheet/ccc?key=0AhWfMzniSmaedDZPdUdRdEx2a3RhTjg0U0hEZXE2eEE&usp=drive_web#gid=0' target='_blank'>bsJS Error Code table</a>

## APIs

- bs Core [<a href='https://github.com/projectBS/bsJS/wiki/doc1-core' target='_blank'>ko</a>][<a href='https://github.com/projectBS/bsJS/wiki/doc1-core-ja' target='_blank'>ja</a>]
- bs Base Function [<a href='https://github.com/projectBS/bsJS/wiki/doc2-base-function' target='_blank'>ko</a>][<a href='https://github.com/projectBS/bsJS/wiki/doc2-base-function-ja' target='_blank'>ja</a>]
- bs Dom [<a href='https://github.com/projectBS/bsJS/wiki/doc3-Dom' target='_blank'>ko</a>][<a href='https://github.com/projectBS/bsJS/wiki/doc3-Dom-ja' target='_blank'>ja</a>]
- Structure of BS [<a href='https://github.com/projectBS/bsJS/wiki/Structure-of-BS' target='_blank'>ko</a>][<a href='https://github.com/projectBS/bsJS/wiki/Structure-of-BS-ja' target='_blank'>ja</a>] : 작성 중

<a href='' target='_blank'></a>

 
# License

bsJS is licensed under <a href='http://opensource.org/licenses/BSD-3-Clause' target='_blank'><b>BSD</b></a> and is Open Source.

# Contact us

<a href='https://www.facebook.com/groups/bs5js/' target='_blank'>bsJS Facebook Group</a>



----------
Copyrightⓒ 2013, ProjectBS Committee. All rights reserved.
