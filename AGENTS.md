# Architecture rules
- Ticket access uses a server-signed checkout token rather than public registration reads, so buyer details remain private.
- Downloadable tickets are generated from server-verified payment records; return-page parameters never confirm payment.