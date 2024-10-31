import Categories from "../categories/Categories";
import Productlist from "../productList/Productlist";

export default function Home() {
  return (
    <main className="home">
      <Categories/>
      <Productlist/>
    </main>
  )
}
