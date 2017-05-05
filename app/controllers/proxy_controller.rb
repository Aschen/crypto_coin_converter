class ProxyController < ApplicationController

  def cryptocompare_list
    success = false
    while success == false do
      begin
        response = Typhoeus.get("https://www.cryptocompare.com/api/data/coinlist")
        parsed_body = JSON.parse(response.body)
        success = true
      rescue JSON::ParserError
      end
    end

    render json: parsed_body
  end

  def cryptocompare_price
    success = false
    while success == false do
      begin
        response = Typhoeus.get("https://min-api.cryptocompare.com/data/price?#{params.permit(:tsyms, :fsym).to_param}")
        parsed_body = JSON.parse(response.body)
        success = true
      rescue JSON::ParserError
      end
    end

    render json: parsed_body
  end

end
