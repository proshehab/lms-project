import React from "react";
import Layout from "../../../commom/Layout";
import UserSidebar from "../../../commom/UserSidebar";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { apiUrl, token } from "../../../commom/Config";
import toast from "react-hot-toast";

const EditCourse = () => {

    const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    await fetch(`${apiUrl}/courses`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        'Accept': "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          toast.success(result.message);
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
      <section className="section-4">
         <div className='container pb-5 pt-3'>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/account">Account</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page"> Edit Course</li>
                                    </ol>
                                </nav>
        <div className="container">
          <div className="row">
            <div className="col-md-12 mt-5 mb-3">
              <div className="d-flex justify-content-between">
                <h2 className="h3 mb-0 pb-0">Edit Course</h2>
                <Link
                  to="/account/my-courses/create"
                  className="btn btn-primary"
                >
                  Back
                </Link>
              </div>
            </div>
            <div className="col-lg-3 account-sidebar">
              <UserSidebar />
            </div>
            <div className="col-lg-9">

                <div className="col-md-7">
                     <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card border-0">
                  <div className="card-body p-4">
                <h4 className= "h5 border-bottom pb-3 mb-3">Course Detail</h4>
                      <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                          Title
                        </label>
                        <input
                          type="text"
                          {...register("title", {
                            required: "The title field is required.",
                          })}
                          placeholder="Title"
                          className={`form-control ${errors.title ? "is-invalid" : ""}`}
                        />
                        {errors.title && (
                          <p className="invalid-feedback">
                            {errors.title.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <div className="mb-3">
                         <label htmlFor="title" className="form-label">Category</label>
                         <select className="form-select">
                            <option value="">Select Category</option>
                         </select>
                        </div>

                         <div className="mb-3">
                         <label htmlFor="title" className="form-label">Lavel</label>
                         <select className="form-select">
                            <option value="">Select Lavel</option>
                         </select>
                        </div>

                        <div className="mb-3">
                         <label htmlFor="title" className="form-label">Language</label>
                         <select className="form-select">
                            <option value="">Select Language</option>
                         </select>
                        </div>

                        <button className="btn btn-primary">Create</button>
                      </div>
                    
                  </div>
                </div>
              </form>
                </div>
                <div className="col-md-5">

                </div>
             
            </div>
          </div>
        </div>
    </div>
      </section>
    </Layout>
  )
}

export default EditCourse
