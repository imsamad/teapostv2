Asynchronous Logging
Caching
Payload compression
Connection pooling
Avoid N+1 problem
Pagination
JSON serialiser

### Password Saving:

Hashed values are stored by using one-way hash function.

Traditional hash funciton like md-5,sha-1 are fast but vulenerable
to brute-force attack.

So we use bcrypt, which is slow function that uses more resources to compute.

Which for hashing along with original plain password append a randomly
generated salt so that hashed value store in DB are unique if two users use the
same password.

This technique make pre-computaional attack difficult.

[Salting](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#salting)
