$(document).ready(function() {
    
    $('#cryptoDetails').hide()

    function formatCurrency(value, currency) {
        return new Intl.NumberFormat('en-US', { 
            style: 'currency', 
            currency: currency 
        }).format(value);
    }
    
    function convertCurrency(value) {
        return value * 58
    }

    async function getData() {
        var apiURL = "https://api.coincap.io/v2/assets";
        try {
            const response = await fetch(apiURL);
            if (!response.ok) {
              throw new Error(`Response status: ${response.status}`);
            }
        
            const json = await response.json();

            var results = [];
            var searchField = "name";
            var searchVal = $('#cryptoInput').val();

            if(searchVal != "") {
                for (var i=0 ; i < json.data.length ; i++)
                {
                    if (json.data[i][searchField] == searchVal) {
                        results.push(json.data[i]);
                    }
                }

                var result = results[0]
    
                $('#cryptoDetails').show()

                $('#cryptoTitle').html(result.name)
                $('#cryptoRank').html(result.rank)
                $('#cryptoSymbol').html(result.symbol)

                $('#cryptoPriceUSD').html(formatCurrency(result.priceUsd, 'USD'))
                $('#cryptoPricePHP').html(formatCurrency(convertCurrency(result.priceUsd), 'PHP'))
                $('#24hChange').html(parseFloat(result.changePercent24Hr).toFixed(2) + '%')

                $('#24hVolume').html(formatCurrency(result.volumeUsd24Hr, 'USD'))
                $('#cryptoSupply').html(formatCurrency(result.supply, 'USD'))
                $('#cryptoMaxSupply').html(formatCurrency(result.maxSupply, 'USD'))
            } else {
                alert('Not Found')
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    $('#cryptoSubmitButton').click(function() {
        getData()
    })

})