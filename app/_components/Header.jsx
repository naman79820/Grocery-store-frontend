import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CircleUserRound, LayoutGrid, Search, ShoppingBasket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import GlobalApi from '../_utils/GlobalApi';
import { UpdateCartContext } from '../_context/UpdateCartContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState(null);
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);
  const router = useRouter();

  useEffect(() => {
    // Ensure sessionStorage is available before accessing it
    if (typeof window !== 'undefined') {
      const storedUser = sessionStorage.getItem('user');
      const storedJwt = sessionStorage.getItem('jwt');
      setUser(storedUser ? JSON.parse(storedUser) : null);
      setJwt(storedJwt);
    }
  }, []);

  const isLogin = jwt ? true : false;

  const onSignOut = () => {
    sessionStorage.clear();
    router.push('/sign-in');
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    if (user && jwt) {
      getCartItems();
    }
  }, [updateCart, user, jwt]);

  const getCategoryList = () => {
    GlobalApi.getCategory().then(resp => {
      setCategoryList(resp.data.data);
    });
  };

  const getCartItems = async () => {
    try {
      const cartItemList = await GlobalApi.getCartItems(user.id, jwt);
      setTotalCartItem(cartItemList?.length || 0);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  return (
    <div className='flex w-[100%] h-20 shadow-md justify-between'>
      <nav className='flex items-center gap-10 max-[520px]:gap-2'>
        <div>
          <Link href={process.env.NEXT_PUBLIC_URL}>
            <Image
              src="/grocery logo.png"
              height={200}
              width={150}
              alt="icon"
              className='w-[150px] object-contain max-[400px]:w-[100px] max-[350px]:w-[70px] cursor-pointer'
            />
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <h2 className='flex gap-2 font-bold p-3 px-6 max-[460px]:px-3 max-[460px]:text-sm bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400'>
              <LayoutGrid /> Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categoryList.map((category, index) => (
              <Link href={"/products-category/" + category.attributes.Name} key={index}>
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                  <Image
                    src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + category?.attributes?.icon?.data?.[0]?.attributes?.url}
                    alt='icon'
                    width={30}
                    height={30}
                  />
                  <h2 className='text-base font-bold'>{category?.attributes?.Name}</h2>
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className='hidden min-[820px]:flex p-2 gap-3 rounded-full border border-gray-300'>
          <Search />
          <input type="text" placeholder='Search' className='outline-none ' />
        </div>
      </nav>

      <div className='flex items-center gap-5 mr-5 max-[420px]:gap-2  max-[420px]:mr-1'>
        <h2 className='flex gap-2 justify-center items-center'>
          <ShoppingBasket className='h-7 w-7' /> <span className='text-xl bg-gray-100 px-3 rounded-full p-1 '>{totalCartItem}</span>
        </h2>
        {!isLogin ? (
          <Link href={'/sign-in'}> <Button>Login</Button> </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <CircleUserRound className='bg-gray-100 p-2 rounded-full text-primary h-11 w-11 cursor-pointer' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>My Order</DropdownMenuItem>
              <DropdownMenuItem onClick={onSignOut}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Header;
