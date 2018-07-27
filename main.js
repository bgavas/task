$(document).ready(function(){

    // Initialize slider
    $('.campaign-slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        swipeToSlide: true,
        responsive: [{
            breakpoint: 480,
            settings: {
                slidesToShow: 1
            }
        }]
    });

    
    
    // Create and add each prodcut card to the slider
    products.forEach((product, index) => {

        // Add each product
        $('.campaign-slider').slick('slickAdd', createProductCard(product, index));

    });


    // Create a product card with product details without adding to the slider
    function createProductCard(product, index) {

        // Main dummy container. All elemets are insied this div
        var mainDiv = $('<div/>');

        // Created for slick library compatibility in responsive mode
        var slickDiv = $( "<div/>").appendTo(mainDiv);
        // Created for slick library compatibility in responsive mode
        var slickDiv2 = $( "<div/>").appendTo(slickDiv);

        // Container div to adjust background
        var containerDiv = $( "<div/>", {
            "class": 'p-0 ml-2 mr-2',
            style: 'background-color: #f7f7f7; border-radius: 10px;'
        }).appendTo(slickDiv2);

        // Upper hand side of card
        var upperRow = $( "<div/>", {
            "class": 'row pt-2 pb-3 m-0',
            style: 'background-color: #f7f7f7; border-radius: 10px;'
        }).appendTo(containerDiv);

        // Contains badges in the left hand side
        var badgeCol = $( "<div/>", { "class": 'col-3 pl-0 pt-1 pb-1' }).appendTo(upperRow);

        // Is there sale for this product?
        if (product.oldPrice) {

            // Calculate sale amount
            var saleAmount = 100 - Math.round(100 * product.price / product.oldPrice);

            // Discount container
            var badgeColInnerDiv = $( "<div/>", {
                "class": 'pt-1 pb-1 mt-2',
                style: 'font-size: 1rem; background-color: #c2121b; width: 50px; text-align: center;'
            }).appendTo(badgeCol);
    
            // Add discount
            $( "<span/>", { html: '-' + saleAmount + '%' }).appendTo(badgeColInnerDiv);

        }

        // Is product new?
        if (product.params.isNew) {

            // Container of "new" text
            var badgeColInnerDiv = $( "<div/>", {
                "class": 'pt-1 pb-1 mt-2',
                style: 'font-size: 1rem; background-color: black; width: 50px; text-align: center;'
            }).appendTo(badgeCol);
    
            // Add new text
            $( "<span/>", { html: 'NEU' }).appendTo(badgeColInnerDiv);

        }

        // Is there any like for the product?
        if (product.params.likeCount) {

            // Like container
            var badgeColInnerDiv = $( "<div/>", {
                "class": 'mt-2',
                style: 'padding-top: 4px; padding-bottom: 4px; background-color: white; width: 50px; justify-content: center; display: flex;'
            }).appendTo(badgeCol);
    
            // Add heart icon
            $( "<img/>", {
                src: './heart.png',
                style: 'height: 24px; width: 18px; padding-top: 3px; padding-bottom: 3px;'
            }).appendTo(badgeColInnerDiv);

            // Add like count
            $( "<span/>", {
                html: '&nbsp;' + product.params.likeCount,
                style: 'color: #D80027; font-size: 1rem;'
            }).appendTo(badgeColInnerDiv);

        }

        // Product image container
        var imageDiv = $( "<div/>", { "class": 'col-6' }).appendTo(upperRow);

        // Add product image
        $( "<img/>", {
            "class": 'w-100 pl-2 pr-2',
            src: product.image,
            style: 'mix-blend-mode: multiply;'
        }).appendTo(imageDiv);

        // Lower hand side of card
        var lowerRow = $( "<div/>", { "class": 'row m-0' }).appendTo(containerDiv);

        // Name container
        var nameContainer = $( "<div/>", {
            "class": 'col-12',
            id: 'nameDiv' + index,
            style: 'text-align: center; height: 80px; overflow: hidden;'
        }).appendTo(lowerRow);

        // Add prodcut name
        $( "<div/>", {
            html: product.name,
            style: 'color: black; font-size: 0.9rem; font-weight: 600;'
        }).appendTo(nameContainer);

        // Get details and create meaningful description
        var detail = product.params.land;
        if (product.params.region) 
            if (detail) detail += ' | ' + product.params.region;
            else detail = product.params.region;
        if (product.params.art)
            if (detail) detail += ' | ' + product.params.art;
            else detail = product.params.art;
        if (product.params.rebsorte)
            if (detail) detail += ' | ' + product.params.rebsorte;
            else detail = product.params.rebsorte;
            
        // Detail container
        var detailContainer = $( "<div/>", {
            "class": 'col-12',
            style: 'text-align: center; height: 40px; overflow: hidden;'
        }).appendTo(lowerRow);

        // Add details
        $( "<div/>", {
            html: detail,
            style: 'color: gray; font-size: 0.7rem;'
        }).appendTo(detailContainer);

        // Price container
        var priceContainer = $( "<div/>", {
            "class": 'col-12 p-0',
            style: 'text-align: center;'
        }).appendTo(lowerRow);

        // Add new price for any case
        $( "<span/>", {
            html: product.price.toFixed(2) + '€* ',
            style: 'color: black; font-size: 1rem; font-weight: 600;'
        }).appendTo(priceContainer);

        // Is there an old price for this product?
        if (product.oldPriceText) {

            // Add old price
            $( "<span/>", {
                html: '&nbsp;' + product.oldPrice.toFixed(2) + '€*',
                style: 'color: gray; font-size: 1rem; font-weight: 600; text-decoration: line-through;'
            }).appendTo(priceContainer);

        }

        // Base price info container
        var basePriceContainer = $( "<div/>", {
            "class": 'col-12 pt-2',
            style: 'text-align: center; height: 40px;'
        }).appendTo(lowerRow);

        // Add base price info
        $( "<div/>", {
            html: product.params.basePrice,
            style: 'color: gray; font-size: 0.7rem;'
        }).appendTo(basePriceContainer);

        // Return card
        return mainDiv;

    }

    // Truncuate text if exceeds the height.
    // This function not used because not needed.
    // It may be needed for a complicated example in the future
    function ellipsizeTextBox(id) {
        var el = document.getElementById(id);
        var wordArray = el.innerHTML.split(' ');
        console.log(el.scrollHeight, el.offsetHeight);
        while(el.scrollHeight > el.offsetHeight) {
            wordArray.pop();
            el.innerHTML = wordArray.join(' ') + '...';
        }
    }

});