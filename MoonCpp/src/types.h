#ifndef MOONCPP_TYPES_H
#define MOONCPP_TYPES_H

template<typename T, typename F>
bool instanceof(F _o) { return dynamic_cast<T>(_o); }

template<typename T, typename F>
T as(F _o) { return dynamic_cast<T>(_o); }

#endif //MOONCPP_TYPES_H
