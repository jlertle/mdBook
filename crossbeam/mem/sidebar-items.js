initSidebarItems({"mod":[["epoch","Epoch-based memory managementThis module provides fast, easy to use memory management for lock free data structures. It's inspired by Keir Fraser's *epoch-based reclamation*.The basic problem this is solving is the fact that when one thread has removed a node from a data structure, other threads may still have pointers to that node (in the form of snapshots that will be validated through things like compare-and-swap), so the memory cannot be immediately freed. Put differently:There are two sources of reachability at play -- the data structure, and the snapshots in threads accessing it. Before we delete a node, we need to know that it cannot be reached in either of these ways.Once a node has been unliked from the data structure, no *new* snapshots reaching it will be created.Using the epoch scheme is fairly straightforward, and does not require understanding any of the implementation details:When operating on a shared data structure, a thread must \"pin the current epoch\", which is done by calling `pin()`. This function returns a `Guard` which unpins the epoch when destroyed.When the thread subsequently reads from a lock-free data structure, the pointers it extracts act like references with lifetime tied to the `Guard`. This allows threads to safely read from snapshotted data, being guaranteed that the data will remain allocated until they exit the epoch.To put the `Guard` to use, Crossbeam provides a set of three pointer types meant to work together:`Owned<T>`, akin to `Box<T>`, which points to uniquely-owned data that has not yet been published in a concurrent data structure.`Shared<'a, T>`, akin to `&'a T`, which points to shared data that may or may not be reachable from a data structure, but it guaranteed not to be freed during lifetime `'a`.`Atomic<T>`, akin to `std::sync::atomic::AtomicPtr`, which provides atomic updates to a pointer using the `Owned` and `Shared` types, and connects them to a `Guard`.Each of these types provides further documentation on usage.Example"]],"struct":[["CachePadded","Pad `T` to the length of a cacheline.Sometimes concurrent programming requires a piece of data to be padded out to the size of a cacheline to avoid \"false sharing\": cachelines being invalidated due to unrelated concurrent activity. Use the `CachePadded` type when you want to *avoid* cache locality.At the moment, cache lines are assumed to be 32 * sizeof(usize) on all architectures.**Warning**: the wrapped data is never dropped; move out using `ptr::read` if you need to run dtors."]],"trait":[["ZerosValid","Types for which mem::zeroed() is safe.If a type `T: ZerosValid`, then a sequence of zeros the size of `T` must be a valid member of the type `T`."]]});