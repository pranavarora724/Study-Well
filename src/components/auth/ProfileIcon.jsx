

function ProfileIcon(props)
{
    const imageUrl = props.user.imageUrl;
    return(
        <div>
            <div className="rounded-full">
                <img className="rounded-full object-cover object-top w-8 h-8 " src={`${imageUrl}`}></img>
            </div>
        </div>
    );
}

export default ProfileIcon;