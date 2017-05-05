namespace :images do

  task download: :environment do

    response = Typhoeus.get("https://www.cryptocompare.com/api/data/coinlist")

    parsed_body = JSON.parse response.body

    availables_currencies = parsed_body["Data"].map do |(_, value)|
      value["ImageUrl"] = "https://www.cryptocompare.com#{value["ImageUrl"]}"
      value
    end

    hydra = Typhoeus::Hydra.hydra

    availables_currencies.each do |currency|
      request = Typhoeus::Request.new(currency['ImageUrl'])

      request.on_complete do |resp|
        open("#{Rails.root.join('app', 'assets', 'images', 'coins')}/#{currency['Name']}.png", 'wb') do |file|
          file << resp.body
        end
      end

      hydra.queue request
    end

    hydra.run

  end

end
