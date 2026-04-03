import React from "react";
import Layout from "../../../commom/Layout";
import UserSidebar from "../../../commom/UserSidebar";
import { Link,useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { apiUrl ,token} from "../../../commom/Config";
import toast from "react-hot-toast";


const CreateCourse = () => {

    const{handleSubmit, register,formState: {errors}} = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
      await fetch (`${apiUrl}/courses`, {
         method: 'POST',
         headers: {
           'Content-type': 'application/json',
           'Accept' : 'application/json',
           'Authorization' : `Bearer ${token}`
         },
         body: JSON.stringify(data)
       })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          toast.error(result.message);
          navigate("/account/courses/edit/" + result.data.id);
        } else {
          toast.error(result.message);
          // Object.keys(errors).forEach(field => {
          // setError(field, { message: errors[field][0] })
          // })
        }
      });
    };

  return (
    <Layout>
        <section className='section-4'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12 mt-5 mb-3'>
                            <div className='d-flex justify-content-between'>
                                <h2 className='h3 mb-0 pb-0'>Create Course</h2>
                                <Link to='/account/my-courses/create' className='btn btn-primary'>Back</Link>
                            </div>
                        </div>
                        <div className='col-lg-3 account-sidebar'>
                            <UserSidebar />
                        </div>
                        <div className='col-lg-9'>

                            <form onSubmit={handleSubmit(onSubmit)}>

                                <div className='card border-0'>
                                    <div className='card-body'>
                                        <div className='row'>
                                            <div className='mb-3'>
                                                <label htmlFor="" className='form-label'>Title</label>
                                                <input
                                                    type="text"
                                                    {...register('title', {
                                                      required: 'The title field is required.'
                                                    })}
                                                    placeholder='Title'
                                                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                                />
                                                {errors.title && (
                                                    <p className="invalid-feedback">{errors.title.message}</p>
                                                )}
                                            </div>
                                            <div>
                                                <button className='btn btn-primary'>Create</button>
                                            </div>
                                        </div>                                        
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
    </Layout>
  );
};

export default CreateCourse;
