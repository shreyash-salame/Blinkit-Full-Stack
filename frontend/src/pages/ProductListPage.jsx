import React, { useEffect, useState } from 'react';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { Link, useParams } from 'react-router-dom';
import AxiosToastError from '../utils/AxiosToastError';
import Loading from '../components/Loading';
import CardProduct from '../components/CardProduct';
import { useSelector } from 'react-redux';
import { valideURLConvert } from '../utils/valideURLConvert';

const ProductListPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const params = useParams();
  const AllSubCategory = useSelector((state) => state.product.allSubCategory);
  const [DisplaySubCategory, setDisplaySubCategory] = useState([]);

  const subCategory = params?.subCategory?.split('-');
  const subCategoryName = subCategory?.slice(0, subCategory?.length - 1)?.join(' ');

  const categoryId = params.category.split('-').slice(-1)[0];
  const subCategoryId = params.subCategory.split('-').slice(-1)[0];

  // Fetch product data from the API
  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId,
          subCategoryId,
          page,
          limit: 8,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setData(responseData.data);
        setTotalPages(Math.ceil(responseData.totalCount / 4)); // Calculate total pages
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch product data whenever the page or params change
  useEffect(() => {
    fetchProductData();
  }, [page, params]);

  // Filter subcategories based on categoryId
  useEffect(() => {
    const filteredSubcategories = AllSubCategory.filter((subcategory) =>
      subcategory.category.some((cat) => cat._id === categoryId)
    );
    setDisplaySubCategory(filteredSubcategories);
  }, [params, AllSubCategory]);

  // Handle pagination actions
  const handleNextPage = () => {
    if (page < totalPages) setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  return (
    <section className="sticky top-24 lg:top-20">
      <div className="container mx-auto grid grid-cols-[90px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]">
        {/* Subcategory Sidebar */}
        <div className="min-h-[88vh] max-h-[88vh] overflow-y-scroll grid gap-1 shadow-md scrollbarCustom bg-white py-2">
          {DisplaySubCategory.map((subcategory, index) => {
            const link = `/${valideURLConvert(subcategory?.category[0]?.name)}-${subcategory?.category[0]?._id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`;
            return (
              <Link
                key={`${subcategory._id}-${index}`}
                to={link}
                className={`w-full p-2 lg:flex items-center lg:w-full lg:h-16 box-border lg:gap-4 border-b hover:bg-green-100 cursor-pointer ${
                  subCategoryId === subcategory._id ? 'bg-green-100' : ''
                }`}
              >
                <div className="w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded box-border">
                  <img
                    src={subcategory.image}
                    alt="subCategory"
                    className="w-14 lg:h-14 lg:w-12 h-full object-scale-down"
                  />
                </div>
                <p className="-mt-6 lg:mt-0 text-xs text-center lg:text-left lg:text-base">{subcategory.name}</p>
              </Link>
            );
          })}
        </div>

        {/* Product Section */}
        <div className="sticky top-20">
          <div className="bg-white shadow-md p-4 z-10">
            <h3 className="font-semibold">{subCategoryName}</h3>
          </div>
          <div>
            <div className="min-h-[80vh] max-h-[80vh] overflow-y-auto relative">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4">
                {data.map((product, index) => (
                  <CardProduct data={product} key={`${product._id}-productSubCategory-${index}`} />
                ))}
              </div>
            </div>
            {loading && <Loading />}
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-between items-center bg-white p-4 shadow-md">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className={`px-4 py-2 rounded ${page === 1 ? 'bg-gray-300' : 'bg-green-500 text-white hover:bg-green-600'}`}
            >
              Previous
            </button>
            <p>
              Page {page} of {totalPages}
            </p>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded ${
                page === totalPages ? 'bg-gray-300' : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListPage;
