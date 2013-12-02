#ifndef __NODEJS_CONNECTION_H_INCLUDED__
#define __NODEJS_CONNECTION_H_INCLUDED__

#include <pthread.h>
#include <stdint.h>
#include <cstring>
#include <string>
#include "exception.h"
#include "result.h"

namespace nodejs_db {
class Connection {
    public:
        static pthread_mutex_t staticConnectionLock;

        const char quoteString;

        Connection();
        virtual ~Connection();
        virtual std::string getHostname() const;
        virtual void setHostname(const std::string& hostname);
        virtual std::string getUser() const;
        virtual void setUser(const std::string& user);
        virtual std::string getPassword() const;
        virtual void setPassword(const std::string& password);
        virtual std::string getDatabase() const;
        virtual void setDatabase(const std::string& database);
        virtual uint32_t getPort() const;
        virtual void setPort(uint32_t port);
        virtual bool isAlive(bool ping = false);
        virtual std::string escapeName(const std::string& string) const throw(Exception&);
        virtual void open() throw(Exception&) = 0;
        virtual void close() = 0;
        virtual std::string escape(const std::string& string) const throw(Exception&) = 0;
        virtual std::string version() const = 0;
        virtual Result* query(const std::string& query) const throw(Exception&) = 0;
        virtual Result* query_x(const std::string& query) const throw(Exception&) = 0;
        virtual void lock();
        virtual void unlock();

    protected:
        std::string hostname;
        std::string user;
        std::string password;
        std::string database;
        uint32_t port;
        bool alive;
        char quoteName;
        pthread_mutex_t *connectionLock;
};
}

#endif  // __NODEJS_CONNECTION_H_INCLUDED__
