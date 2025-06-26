import React from 'react'
import Layout from '../../../commom/Layout'
import { Link } from 'react-router-dom'
import UserSidebar from "../../../commom/UserSidebar";
import { useForm } from 'react-hook-form'
import { apiUrl } from '../../../commom/Config'

const CreateCourse = () => {
    const {register, handleSubmit,formState: {errors}} = useForm();
    const onSubmit = async (data) => {
        await fetch(`${apiUrl}/courses`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          const userInfo = {
            name: result.name,
            id: result.id,
            token: result.token,
          };
          localStorage.setItem("userInfoLms", JSON.stringify(userInfo));
          login(userInfo);
          navigate("/account/dashboard");
        } else {
          toast.error(result.message);
        }
      });
  };
  return (
    <Layout>
        <section className='section-4'>
             <div className='container pb-5 pt-3'>
				<nav aria-label="breadcrumb">
					<ol className="breadcrumb">
						<li className="breadcrumb-item"><Link to="/account">Account</Link></li>
						<li className="breadcrumb-item active" aria-current="page">Dashboard</li>
					</ol>
				</nav>
                <div className='row'>
                    <div className='col-md-12 mt-5 mb-3'>
                        <div className='d-flex justify-content-between'>
                            <h2 className='h4 mb-0 pb-0'>Dashboard</h2>
                        </div>
                    </div>
                    <div className='col-lg-3 account-sidebar'>
                        <UserSidebar/>
                    </div>
                    <div className='col-lg-9'>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className='card border-0 shadow-lg'>
                                <div className='card-body p4'>
                                    <div className='mb-3'>
                                        <label htmlFor="title">Title</label>
                                        <input type="text"
                                        {...register('title', {required: 'Title is required'})}
                                        className={`form-control ${errors.title ? 'is-invalid' : ''}`} placeholder='Title'/>

                                        {errors.title && <p className='text-danger'>{errors.title.message}</p>}

                                    </div>
                                    <button className='btn btn-primary'>Continue</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </Layout>
  )
}

export default CreateCourse