import { useEffect, useState } from "react";
import axios from "axios";
import {
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    Edit,
    Trash2,
    Eye,
    Package,
    Star,
    Delete
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../Context/Context";
const Button = ({ children, className = "", variant = "primary", ...props }) => {
    const base = variant === "outline"
        ? "border border-gray-300 text-gray-700 hover:bg-gray-50"
        : variant === "destructive"
            ? "bg-red-600 text-white hover:bg-red-700"
            : "bg-blue-600 text-white hover:bg-blue-700";
    return (
        <button className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${base} ${className}`} {...props}>
            {children}
        </button>
    );
};

const Input = ({ className = "", ...props }) => (
    <input
        className={`w-full px-3 py-2 border rounded-md text-sm ${className}`}
        {...props}
    />
);

const Card = ({ children, className = "" }) => (
    <div className={`border rounded-lg bg-white p-4 ${className}`}>{children}</div>
);
const CardHeader = ({ children }) => <div className="mb-3">{children}</div>;
const CardTitle = ({ children }) => <h2 className="text-lg font-semibold">{children}</h2>;
const CardContent = ({ children }) => <div>{children}</div>;

const Badge = ({ children, variant = "default" }) => {
    const styles = {
        default: "bg-gray-200 text-gray-800",
        secondary: "bg-blue-100 text-blue-800",
        destructive: "bg-red-100 text-red-800",
        success: "bg-green-100 text-green-800",
        warning: "bg-yellow-100 text-yellow-800",
    };
    return (
        <span className={`text-xs font-medium px-2 py-1 rounded ${styles[variant]}`}>
            {children}
        </span>
    );
};

export default function Products() {
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showEditModel, setShowEditModel] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        quantity: "",
        category: "",
        discount: "",
        ratings: "",
        image: null
    });
    // const { productId } = req.params;
    // const { name, description, price, quantity, category, discount, ratings } = req.body;
    const [errorMsg, setErrorMsg] = useState('');
    const [product, setProduct] = useState([])
    const URL = "http://localhost:8081";
    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { adminId } = useAdminContext();
    const navigate = useNavigate()
    useEffect(() => {
        if (adminId === false) {
            navigate("/"); // redirect to login
        }
    }, [adminId, navigate]);
    const getAllProducts = async () => {
        try {
            const res = await axios.get(`${URL}/api/product/getProductAll`, { withCredentials: true });
            setProducts(res.data.data);
        } catch (error) {
            console.log("product admin panel", error);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    const filtered = products.filter(
        p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getBadge = (status, stock) => {
        if (status === "out_of_stock" || stock === 0) return <Badge variant="destructive">Out of Stock</Badge>;
        if (stock < 10) return <Badge variant="warning">Low Stock</Badge>;
        return <Badge variant="success">In Stock</Badge>;
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
    };

    const handleAddProduct = async () => {
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });

        try {
            const res = await axios.post(`${URL}/api/product/addProduct`, data, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success("Product added successfully!");
                setShowModal(false);
                getAllProducts();
                setErrorMsg(''); // clear previous errors
            } else {
                // 🔴 Set the error message from backend
                setErrorMsg(res.data.message || "Something went wrong.");
            }
        } catch (error) {
            // 🔴 Show backend error message if available
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMsg(error.response.data.message);
            } else {
                setErrorMsg("Add product failed. Please try again.");
            }
        }
    };

    const handelEditProduct = async (product) => {
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });
        console.log("data", data);

        try {
            const res = await axios.post(
                `${URL}/api/product/editProduct/${product._id}`,
                data,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (res.data.success) {
                toast.success("Product update successfully!");
                setShowEditModel(false);
                getAllProducts();
                setErrorMsg(''); // clear previous errors
            } else {
                setErrorMsg(res.data.message || "Something went wrong.");
            }
        } catch (error) {
            setErrorMsg("update product failed. Please try again.");
        }
    }
    const handelDelete = async (product) => {
        try {
            const res = await axios.delete(`${URL}/api/product/deleteProduct/${product._id}`, { withCredentials: true })
            if (res.data.success) {
                toast.success(res.data.message)
                await getAllProducts()
            }
        } catch (error) {
            console.log("delete product", error);
            setErrorMsg("update product failed. Please try again.");

        }
    }
    const handelSeeTheProductDetails = async (product) => {
        try {
            const res = await axios.get(`${URL}/api/product/getproduct/${product._id}`, {
                withCredentials: true
            });

            if (res.data.success) {
                setSelectedProduct(res.data.data);  // Assuming backend sends { success, product }
                setShowProductModal(true);             // Open the modal
            }
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };

    return (
        <div className="space-y-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Products</h1>
                    <p className="text-gray-500">Manage your product listings</p>
                </div>
                <Button onClick={() => setShowModal(true)}>
                    <Plus className="h-4 w-4" /> Add Product
                </Button>
            </div>

            <div className="flex gap-4">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Button variant="outline">
                    <Filter className="h-4 w-4" /> Filter
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((product) => (
                    <Card
                        key={product._id}
                        className="hover:shadow-md transition rounded-xl overflow-hidden"
                    >
                        <CardHeader className="p-4 pb-0">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-lg font-semibold mb-2">
                                        {product.name}
                                    </CardTitle>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-40 object-cover object-center rounded-lg mb-2"
                                    />
                                    <p className="text-sm text-gray-500">
                                        Category: <span className="font-medium">{product.category}</span>
                                    </p>
                                </div>
                                <MoreHorizontal className="text-gray-400 h-5 w-5" />
                            </div>
                        </CardHeader>

                        <CardContent className="p-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xl font-bold text-blue-600">
                                    ₹{product.price}
                                </span>
                                {getBadge(product.status, product.quantity)}
                            </div>

                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>Stock: {product.quantity}</span>
                                <span className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    {product.ratings}
                                </span>
                            </div>

                            <div className="flex gap-2 mt-4 flex-wrap">
                                <Button
                                    onClick={() => {
                                        // handelEditProduct(product);
                                        setShowEditModel(true);
                                        //for only edit and delete
                                        setProduct(product)
                                    }}
                                    variant="outline"
                                    className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-black text-sm px-3 py-1 rounded-md"
                                >
                                    <Edit className="h-4 w-4" />
                                    Edit
                                </Button>


                                <Button onClick={() => handelSeeTheProductDetails(product)}
                                    variant="outline"
                                    className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded-md"
                                >
                                    <Eye className="h-4 w-4" />
                                    View
                                </Button>
                                <Button
                                    onClick={() => {
                                        handelDelete(product)
                                    }}
                                    variant="destructive"
                                    className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md"
                                >
                                    <Delete className="h-4 w-4" />
                                    Delete
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-16 text-gray-500">
                    <Package className="mx-auto mb-4 h-10 w-10" />
                    <p className="text-lg">No products found</p>
                    <p className="text-sm mt-1">Try adjusting your search</p>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md space-y-4 border border-gray-200">

                        <h2 className="text-xl font-semibold text-gray-800">Add New Product</h2>

                        {/* Error Message */}
                        {errorMsg && (
                            <p className="text-red-700 bg-red-100 border border-red-300 px-4 py-2 rounded-md text-sm">
                                {errorMsg}
                            </p>
                        )}

                        {/* Input Fields */}
                        <Input name="name" placeholder="Product Name" onChange={handleInputChange} />
                        <Input name="description" placeholder="Description" onChange={handleInputChange} />
                        <Input name="price" type="number" placeholder="Price" onChange={handleInputChange} />
                        <Input name="quantity" type="number" placeholder="Quantity" onChange={handleInputChange} />
                        <Input name="category" placeholder="Category" onChange={handleInputChange} />
                        <Input name="discount" type="number" placeholder="Discount (%)" onChange={handleInputChange} />
                        <Input name="ratings" type="number" placeholder="Ratings (0–5)" onChange={handleInputChange} />
                        <Input name="image" type="file" onChange={handleInputChange} />

                        {/* Buttons */}
                        <div className="flex justify-end gap-2 pt-2">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setShowModal(false);
                                    handelEditProduct(product);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button onClick={handleAddProduct}>
                                Add Product +
                            </Button>

                        </div>
                    </div>
                </div>
            )}
            {showEditModel && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md space-y-4 border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800">Edit Product</h2>

                        {errorMsg && (
                            <p className="text-red-700 bg-red-100 border border-red-300 px-4 py-2 rounded-md text-sm">
                                {errorMsg}
                            </p>
                        )}

                        <Input name="name" placeholder="Product Name" value={formData.name} onChange={handleInputChange} />
                        <Input name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} />
                        <Input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleInputChange} />
                        <Input name="quantity" type="number" placeholder="Quantity" value={formData.quantity} onChange={handleInputChange} />
                        <Input name="category" placeholder="Category" value={formData.category} onChange={handleInputChange} />
                        <Input name="discount" type="number" placeholder="Discount (%)" value={formData.discount} onChange={handleInputChange} />
                        <Input name="ratings" type="number" placeholder="Ratings (0–5)" value={formData.ratings} onChange={handleInputChange} />
                        <Input name="image" type="file" onChange={handleInputChange} />

                        <div className="flex justify-end gap-2 pt-2">
                            <Button variant="outline" onClick={() => setShowEditModel(false)}>
                                Cancel
                            </Button>
                            <Button onClick={() => handelEditProduct(product)}>
                                Update Product
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {showProductModal && selectedProduct && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-[400px] max-h-[90vh] overflow-auto shadow-lg relative">
                        <h2 className="text-xl font-semibold mb-4">Product Details</h2>

                        <p><strong>Name:</strong> {selectedProduct.name}</p>
                        <p><strong>Price:</strong> ₹{selectedProduct.price}</p>
                        <p><strong>Category:</strong> {selectedProduct.category}</p>
                        <p><strong>Description:</strong> {selectedProduct.description}</p>
                        <p><strong>Ratings:</strong> {selectedProduct.ratings}</p>

                        {selectedProduct.image && (
                            <img
                                src={selectedProduct.image}
                                alt={selectedProduct.name}
                                className="w-full h-auto rounded mt-3"
                            />
                        )}

                        <Button className="mt-4" onClick={() => setShowProductModal(false)}>
                            Close
                        </Button>
                    </div>
                </div>
            )}


        </div>
    );
}
