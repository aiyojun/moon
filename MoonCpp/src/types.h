#ifndef MOONCPP_TYPES_H
#define MOONCPP_TYPES_H

template<typename T, typename F>
bool instanceof(F _o) { return dynamic_cast<T>(_o); }

template<typename T, typename F>
T as(F _o) { return dynamic_cast<T>(_o); }

#include <memory>
#define Wrapper(T) std::shared_ptr<T>
#define Weak(T) std::weak_ptr<T>
#define Wrap(T, x) std::shared_ptr<T>(x)

template<typename Derive, typename Base>
std::shared_ptr<typename std::enable_if<(!std::is_same<Base, Derive>::value) && (std::is_base_of<Base, Derive>::value), Derive>::type>
downcast(std::shared_ptr<Base> ptr) { return std::static_pointer_cast<Derive>(ptr); }

template<typename T, typename F>
bool instanceof(std::shared_ptr<F> _o) { return dynamic_cast<T>(_o.get()); }

#endif //MOONCPP_TYPES_H
