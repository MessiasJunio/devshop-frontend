import React from 'react'
import Layout from '../../components/layout'
import Title from '../../components/Title'
import Button from '../../components/Button'
import { useMutation, useQuery } from '../../lib/graphql'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import Input from '../../components/Input'
import Select from '../../components/Select'

const CREATE_PRODUCT = `
    mutation createProduct ($name: String!, $slug: String!, $description: String!, $category: String!) {
      createProduct (input: {
        name: $name,
        slug: $slug,
        description: $description,
        category: $category
      }) {
        id
        name 
        slug
        description
        category
      }
    }
  `

const GET_ALL_CATEGORIES = `
  query {
    getAllCategories{
      id
      name 
      slug
    }
  }
`
const Index = () => {
  const router = useRouter()
  const [data, createProduct] = useMutation(CREATE_PRODUCT)
  const { data: categories, mutate } = useQuery(GET_ALL_CATEGORIES)

  const form = useFormik({
    initialValues: {
      name: '',
      slug: '',
      description: '',
      category: ''
    },
    onSubmit: async values => {
      await createProduct(values)
      router.push('/products')
    }
  })

  let options = []
  if (categories && categories.getAllCategories) {
    options = categories.getAllCategories.map(item => {
      return {
        id: item.id,
        label: item.name
      }
    })
  }
  return (
    <Layout>
      <Title>Criar novo produto</Title>
      <div className='mt-8'></div>
      <div>
        <Button.LinkOutline href='/products'>Voltar</Button.LinkOutline>
      </div>
      <div className='flex flex-col mt-8'>
        <div className='-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
          <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 p-12'>
            <form onSubmit={form.handleSubmit}>
              <Input
                label='Nome do Produto'
                placeholder='Preencha com o nome do produto'
                value={form.values.name}
                onChange={form.handleChange}
                name='name'
              />
              <Input
                label='Slug do Produto'
                placeholder='Preencha com o nome do produto'
                value={form.values.slug}
                onChange={form.handleChange}
                name='slug'
                helpText='Slug é utilizado para URLs amigáveis.'
              />
              <Input
                label='Descrição do produto'
                placeholder='Preencha com descrição do produto'
                value={form.values.description}
                onChange={form.handleChange}
                name='description'
              />

              <Select
                label='Selectiona a categoria'
                name='category'
                onChange={form.handleChange}
                value={form.values.category}
                options={options}
              />
              <Button>Criar Produto</Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default Index
