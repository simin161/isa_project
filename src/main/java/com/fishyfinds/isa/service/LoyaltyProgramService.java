package com.fishyfinds.isa.service;

import com.fishyfinds.isa.model.beans.LoyaltyProgram;
import com.fishyfinds.isa.model.beans.users.User;
import com.fishyfinds.isa.model.beans.users.customers.Customer;
import com.fishyfinds.isa.model.beans.users.instructors.Instructor;
import com.fishyfinds.isa.model.beans.users.owners.BoatOwner;
import com.fishyfinds.isa.repository.LoyaltyProgramRepository;
import com.fishyfinds.isa.repository.usersRepository.BoatOwnerRepostory;
import com.fishyfinds.isa.repository.usersRepository.CustomerRepository;
import com.fishyfinds.isa.repository.usersRepository.InstructorRepository;
import com.fishyfinds.isa.repository.usersRepository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class LoyaltyProgramService {

    @Autowired
    private LoyaltyProgramRepository loyaltyProgramRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private BoatOwnerRepostory boatOwnerRepostory;
    @Autowired
    private InstructorRepository instructorRepository;

    public void addNewLoyalty(Map<String, String> message){
        LoyaltyProgram loyalty = new LoyaltyProgram();
        loyalty.setCategoryName(message.get("categoryName"));
        loyalty.setCategoryDiscount(Double.parseDouble(message.get("categoryDiscount")));
        loyalty.setId(Integer.parseInt(message.get("id")));
        loyalty.setEarningRate(Double.parseDouble(message.get("earningRate")));
        loyalty.setMaxPoints(Integer.parseInt(message.get("maxPoints")));
        loyalty.setMinPoints(Integer.parseInt(message.get("minPoints")));
        loyalty.setType(Integer.parseInt(message.get("type")));
        if(!checkIfExists(loyalty.getCategoryName()))
            loyaltyProgramRepository.save(loyalty);
    }

    private boolean checkIfExists(String category){
        for(LoyaltyProgram program : loyaltyProgramRepository.findAll()){
            if(category.equalsIgnoreCase(program.getCategoryName())){
                return true;
            }
        }
        return false;
    }

    public void deleteLoyalty(LoyaltyProgram loyalty){
        loyaltyProgramRepository.delete(loyalty);
    }

    public List<LoyaltyProgram> getAllLoyalties(){
        return loyaltyProgramRepository.findAll();
    }

    public boolean setLoyaltyToCustomer(Customer customer, LoyaltyProgram loyaltyProgram){
        try{
            customer.setLoyaltyProgram(loyaltyProgram);
            customerRepository.save(customer);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

    public boolean setLoyaltyToInstructor(Instructor instructor, LoyaltyProgram loyaltyProgram){
        try{
            instructor.setLoyaltyProgram(loyaltyProgram);
            instructorRepository.save(instructor);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

    public boolean setLoyaltyToOwner(BoatOwner owner, LoyaltyProgram loyaltyProgram){
        try{
            owner.setLoyaltyProgram(loyaltyProgram);
            boatOwnerRepostory.save(owner);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }
}
