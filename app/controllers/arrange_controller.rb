require 'dotenv/load'
require 'sendgrid-ruby'
require 'json'
include SendGrid

class ArrangeController < ApplicationController
  def index
    puts params[:gimps]
  end

  def sendFlowers
    from = Email.new(email: 'flowers@wildflowers.love')
    to = Email.new(email: params[:email])
    subject = "#{params[:name]}, someone sent you flowers!"
    content = Content.new(type: 'text/plain', value: params[:message])
    mail = SendGrid::Mail.new(from, subject, to, content)

    attachment = Attachment.new
    attachment.content = params[:allflowers].split(",",2)[1]
    attachment.type = 'image/png'
    attachment.filename = 'yourflowers.png'
    attachment.disposition = 'attachment'
    mail.add_attachment(attachment)

    sg = API.new(api_key: ENV['SENDGRID_API_KEY'])
    response = sg.client.mail._('send').post(request_body: mail.to_json)
    redirect_to '/', notice: 'Your flowers have been delivered!'
  end

end
