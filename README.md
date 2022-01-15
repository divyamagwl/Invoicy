# Invoicy <span style="font-size:medium;">[Invoice Management Systemized]</span>

## Inspiration

We wanted to build an app in the field of Finance. With the current growth of crypto , we believe that soon more people would need to use such Invoice Management Tools, and hence we wanted to take up this challenge.


## What it does

Our project is an all-in-one platform to manage your invoices. You can create a professional crypto invoice in minutes or pay it in a few clicks. We have created the best user experience with features such as real-time status updates, Multi-level payment model and invoice management.

Our app allows users to:

- Create a company
  - Users can create a company with company name and email
  - We automatically launch metamask and give the option to the user to select their wallet account to sign up with.
  - Through the app, in our navigation we display the status of the wallet (connected/disconnected) and also the wallet address to avoid any confusion.
  
- Add Clients
  - Users are shown a list of companies registered on our app, they can just select the company they want to add as their client.
  
- Discount Clients
  - We provide discount for each client while adding a client. This discount is then directly applied for all the invoices of that client. This helps the company to save time and not try to remember everytime what percentage of discount we gave to that particular client. You can also edit this discount afterwards if needed. This discount is also editables directly in the invoice.
  
- Block Clients
  - A company can block a client , if the client is possibly spamming the company with invoices or for any other reason.
- Create Invoices
  - We autofill the values of the company and the client you select for the invoice for saving the company's time. We also have options for editing advance percent, tax rate and discount rate directly in create invoice.
  
- View Invoices
  - You can see the Invoice as a pdf so that you can store it locally as well. You can download a copy of the invoice directly from the create invoice page as well.

- Pay Invoices
  - We have implemented multi-level payment model where we have 3 options:
    - 100 % Advance : The client has to pay the total value of the invoice before the work is started.
    - X % Advance : The client has to pay X % (As set in create invoice) of total value before the work is started and the rest after work is completed.
    - 100 % Post Work : The client has to pay the total value of the invoice after the work has been completed.
  - We also provide an option to update the work progress in the dashboard itself.
  
- View Status of an Invoice
  - You can view the amount due and work status of the invoice.
- View Statistics of the company
  - We allow companies to see the details of invoices they have generated, pending invoices, amount paid till date, and many other statistics to help the company understand their current situation.

## How we built it

We started off the project by working on the solidity backend and creating the react frontend parallelly. We implemented features such as Create Company, Add Client and Create Invoice first. We then went on to add the other features.

We worked on the react frontend to meet our needs, we then made connection in the frontend with the backend by writing web3.js code.

We then added new features parallely, that is, we would add a function in the solidity backend, add it in the web3.js code and then invoke it from the frontend.

Once our project was ready, we deployed the backend on Polygon Testnet and the frontend on Netlify.

## Challenges we ran into 

Implementing the frontend of Create Invoice and connecting it to backend was the biggest challenge we faced. We also faced challenges in implementing Real time status updates and Multi level payment model. But we overcame these challenges by working hard to resolve the errors we faced.

## Accomplishments that we're proud of

We are most proud of our create invoice and multi level payment mode. We are also proud of the entire flow we have created which allows users to use our app with ease.

## What we learned

This was the first time for us buidling a DeFi App and it was a great learning experience. We learnt how to expand our app with new features and functionalities.

## What's next for Invoicy

We are very interested to take Invoicy to the next level and the following are our current plans:

- Implement a realtime chat system for companies to talk to clients.
- Give an option to convert settled Invoices into NFTs for the company.

## Built with

- React
- Solidity
- Javascript and Typescript
- Scss
- Github
- Netlify

## Try it out

- [Website](https://invoicy-dapp.netlify.app/)
- [Demo]()

## Important note

To run the website please login to your metamask or portis account and use the following network:

- Network Name: Mumbai Testnet
- RPC URL: https://rpc-mumbai.maticvigil.com/
- Chain ID: 80001

Reload the website after connecting the metamask wallet.