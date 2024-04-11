
import ImageGym from './components/ImageGym/ImageGym'

export default function App() {
  return (
    <section className="bg-gray-800 h-screen grid grid-cols-2" >

      <section className="text-white flex justify-center items-center" >

        <div className="text-center" >

          <h1 className="md:text-5xl font-bold">
            Teste
          </h1>

          <p className="md:text-left">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero, architecto!
          </p>

        </div>

      </section>



      <section className='flex justify-center items-center static'>

        <div className='h-2/4 w-2/4 md:mb-40' >
          <ImageGym />
        </div>

      </section>

    </section>
  )
}