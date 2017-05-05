class HomeController < ApplicationController

  def index
    success = false
    while success == false do
      begin
        response = Typhoeus.get("https://www.cryptocompare.com/api/data/coinlist")
        parsed_body = JSON.parse(response.body)
        success = true
      rescue JSON::ParserError
      end
    end

    @availables_currencies = parsed_body["Data"].map do |(_, currency)|
      begin
        currency["ImageUrl"] = ActionController::Base.helpers.image_url(currency['Name'])
      rescue Sprockets::Rails::Helper::AssetNotFound
        currency["ImageUrl"] = ""
      end
      currency["Url"] = "https://www.cryptocompare.com#{currency["Url"]}"
      currency
    end.sort do |a, b|
      a["SortOrder"].to_i <=> b["SortOrder"].to_i
    end
  end

  def test
  end
end
