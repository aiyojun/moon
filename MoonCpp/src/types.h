#ifndef MOONCPP_TYPES_H
#define MOONCPP_TYPES_H

template<typename _T, typename _F>
bool instanceof(_F _o) { return dynamic_cast<_T>(_o); }

template<typename _T, typename _F>
_T as(_F _o) { return dynamic_cast<_T>(_o); }
#endif //MOONCPP_TYPES_H
